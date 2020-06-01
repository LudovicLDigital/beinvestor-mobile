import React, {Component} from "react";
import {Alert, View} from "react-native";
import {appColors, styles} from "../shared/styles/global";
import {Button, Text} from '@ui-kitten/components';
import UsersList from "../component/subcomponent/users-list";
import HeaderBar from "../component/subcomponent/header-bar";
import GroupService from "../shared/services/entities/groups-service";
import SocketService from "../shared/services/socket-service";

/**
 * Passing in route params :
 * - usersList : the list of users to display
 * - isInInList: if the current user is in the list (like the case where he is member of group)
 * - isGroupsMembers : if the actual users list is member's group
 * - entityLinkedId : the id of the object (if there is one) containing the list
 * - previousRouteIdentifier : if the actual users list is member's group
 */
export default class UsersScreen extends Component {
    constructor(props) {
        super(props);
        this.groupeService = new GroupService();
        this.state = {
            usersList: this.props.route.params.usersList,
            isGroupsMembers: this.props.route.params.isGroupsMembers,
            entityLinkedId: this.props.route.params.entityLinkedId,
            previousRouteIdentifier: this.props.route.params.previousRouteIdentifier,
            userIsInList: this.props.route.params.isInInList,
        };
        this.noOneMessage = this.props.isGroupsMembers ? 'Il n\'y a pas encore de members dans ce groupe' : 'Aucun utilisateurs';
    }

    render() {
        return (
            <View style={[{flex: 1, backgroundColor: appColors.white}]}>
                <HeaderBar route={this.props.route.name} previousRoute={this.state.previousRouteIdentifier} navigation={this.props.navigation}/>
                {(this.state.isGroupsMembers && this.state.entityLinkedId) ?
                    <Button
                        style={{alignSelf: "flex-end"}}
                        size={'small'}
                        onPress={() => this.quitOrJoin()}
                        appearance='outline'
                        status={!this.state.userIsInList ? 'success':'danger'}>
                        {!this.state.userIsInList ? 'Rejoindre le groupe' : 'Quitter le groupe'}
                    </Button>
                    :
                    null
                }
                {(this.state.usersList && this.state.usersList.length > 0) ?
                    <UsersList usersList={this.state.usersList}/>
                    :
                    <Text style={[styles.boldedTitle, {textAlign: 'center', marginTop: 35}]}>{this.noOneMessage}</Text>
                }
            </View>
        )
    }

    quitOrJoin() {
        if (this.state.userIsInList) {
            this.userWillQuit();
        } else {
            this.groupeService.currentUserJoinGroup(this.state.entityLinkedId).then(() => {
                this.setState({userIsInList: true});
                SocketService.joinAChannel(this.state.entityLinkedId);
            }).catch((error) => {
                console.error(error);
            })
        }
    }
    userWillQuit() {
        Alert.alert(
            `Quitter le groupe ?`,
            "Vous ne recevrez plus les notifications liées à ce groupe",
            [
                {
                    text: 'Annuler',
                    onPress: () => {}
                },
                {
                    text: 'Oui',
                    onPress: () => {
                        this.groupeService.currentUserLeftGroup(this.state.entityLinkedId).then(() => {
                            this.setState({userIsInList: false});
                            SocketService.leaveAGroupChannel(this.state.entityLinkedId);
                        }).catch((error) => {
                            console.error(error);
                        })
                    }
                }
            ]
        )
    }
}