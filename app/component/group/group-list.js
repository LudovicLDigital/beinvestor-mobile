import React, {Component} from "react";
import {Alert, FlatList} from 'react-native';
import AuthService from "../../shared/services/auth";
import GroupService from "../../shared/services/entities/groups-service";
import {ROUTE_DETAIL_GRP} from "../../shared/util/constants";
import SocketService from "../../shared/services/socket-service";
import GroupItem from './group-item';

/**
 * PROPS :
 * - groups: the list of group
 * - isdisplayingUserGroups: if the current list display only group of the current user
 * - updateList: callback to update list
 */
export default class GroupList extends Component {
    constructor(props) {
        super(props);
        this.groupeService = new GroupService();
    }

    componentDidMount(): void {
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    render() {
        return (
            <FlatList style={{flex: 1, padding: 15}} data={this.props.groups} keyExtractor={(item, index) => item.id.toString()}
                      renderItem={(item) =>
                          <GroupItem showDetail={(currentUserIsMember) => this.showDetail(item.item, currentUserIsMember)}
                                     group={item.item}
                                     currentUserIsMember={this.props.isdisplayingUserGroups ? true : item.item.currentUserIsMember}
                                     joinGroupMethod={(currentUserIsMember) => this.quitOrJoin(currentUserIsMember, item.item)}
                          />
                      }/>
        )
    }

    quitOrJoin(currentUserIsMember, group) {
        if (currentUserIsMember) {
            this._userWillQuit(group);
        } else {
            this.groupeService.currentUserJoinGroup(group.id).then(() => {
                SocketService.joinAChannel(group.id);
                if (this.props.updateList()) {
                    this.props.updateList();
                }
            }).catch((error) => {
                console.error(error);
            })
        }
    }
    _userWillQuit(group) {
        Alert.alert(
            `Quitter le groupe ${group.name} ?`,
            "Vous ne recevrez plus les notifications liées à ce groupe",
            [
                {
                    text: 'Annuler',
                    onPress: () => {}
                },
                {
                    text: 'Oui',
                    onPress: () => {
                        this.groupeService.currentUserLeftGroup(group.id).then(() => {
                            SocketService.leaveAGroupChannel(group.id);
                            if (this.props.updateList()) {
                                this.props.updateList();
                            }
                        }).catch((error) => {
                            console.error(error);
                        })
                    }
                }
            ]
        )
    }
    showDetail(group, currentUserIsMember) {
        this.props.navigation.navigate(ROUTE_DETAIL_GRP, {groupDisplayed: group, isMember: currentUserIsMember, previousRouteIdentifier: this.props.route.name})
    }
}