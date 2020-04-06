import React, {Component} from "react";
import {
    View, Alert
} from "react-native";
import {styles, appColors} from "../shared/styles/global";
import { Text, Button } from '@ui-kitten/components';
import UsersList from "../component/subcomponent/users-list";
import HeaderBar from "../component/subcomponent/header-bar";
import AuthService from "../shared/services/auth";
import GroupService from "../shared/services/entities/groups-service";

/**
 * Passing in route params :
 * - usersList : the list of users to display
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
            userIsInList: false,
        };
        this.noOneMessage = this.props.isGroupsMembers ? 'Il n\'y a pas encore de members dans ce groupe' : 'Aucun utilisateurs';
        this.currentUserIsInList().then((isIn) => {
            this.setState({userIsInList: isIn})
        })
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
    async currentUserIsInList() {
        const user = await AuthService.getCurrentUser();
        const foundUser = this.state.usersList.filter((userInfo) => user.userInfo.id === userInfo.id)[0];
        if(foundUser && foundUser !==null) return true;
        else return false;
    }

    quitOrJoin() {
        if (this.state.userIsInList) {
            this.userWillQuit();
        } else {
            this.groupeService.currentUserJoinGroup(this.state.entityLinkedId).then(() => {
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
                        }).catch((error) => {
                            console.error(error);
                        })
                    }
                }
            ]
        )
    }
}