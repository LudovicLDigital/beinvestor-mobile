import React, {Component, Fragment} from "react";
import {styles, appColors} from "../../shared/styles/global";
import {FlatList, View, Alert} from 'react-native';
import {
    Button,
    Card,
    Text,
    Icon
} from '@ui-kitten/components';
import AuthService from "../../shared/services/auth";
import {calculDurationFromNow} from "../../shared/util/ui-helpers";
import GroupService from "../../shared/services/entities/groups-service";
import {ROUTE_DETAIL_GRP} from "../../shared/util/constants";
function HeaderGroup({group, currentUserIsMember, joinGroupMethod}) {
    return (
        <Fragment>
            <View style={[{flex: 1}, styles.flexRowAlignCenter, styles.flexRowBetween]}>
                <View style={[styles.flexRowAlignCenter]}>
                    <Icon width={20} height={20} fill={appColors.primary} name='people-outline' />
                    <Text style={{marginLeft: 5}}>{group.members ? group.members.length : 0} membres</Text>
                </View>
                <Button
                    size={'small'}
                    onPress={() => joinGroupMethod(currentUserIsMember)}
                    appearance='outline'
                    status={!currentUserIsMember ? 'success':'danger'}>
                    {!currentUserIsMember ? 'Rejoindre' : 'Quitter'}
                </Button>
            </View>
        </Fragment>
    )
}

/**
 * PROPS :
 * {group, currentUserIsMember, joinGroupMethod, showDetail}
 */
class GroupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: this.props.group,
            currentUserIsMember: this.props.currentUserIsMember,
        }
    }
    render() {
        if (this.state.group) {
            const lastMessageTime = calculDurationFromNow(this.state.group.lastMessage);
            return (
                <View style={{flex: 1, marginBottom: 10}}>
                    <Card onPress={() => this.props.showDetail(this.state.currentUserIsMember)}>
                        <HeaderGroup group={this.state.group} currentUserIsMember={this.state.currentUserIsMember}
                                     joinGroupMethod={(IsMember) => this.props.joinGroupMethod(IsMember)}/>
                        <Text category='h4' style={styles.boldedTitle}>{this.state.group.name}</Text>
                        <Text>{lastMessageTime !== -1 ? 'Dernier message il y a' + lastMessageTime : 'Aucun message'}</Text>
                        <View style={styles.flexRowAlignCenter}>
                            <Icon width={20} height={20} fill={appColors.secondary} name='pin-outline'/>
                            <Text category={'h6'}>{this.state.group.city ? this.state.group.city.name : 'Ville inconnue'}</Text>
                        </View>
                        <Text>Pas d'évènements à venir</Text>
                    </Card>
                </View>
            )
        } else return null;
    }
}
/**
 * PROPS :
 * - groups: the list of group
 * - isdisplayingUserGroups: if the current list display only group of the current user
 */
export default class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMemberMap: new Map(), // contain key groupId and value a boolean which indicate if the current user is member of the group
        };
        this.groupeService = new GroupService();
    }

    componentDidMount(): void {
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
            const tempMap = new Map();
            if (this.props.groups && this.props.groups.length > 0) {
                for (let i = 0; i < this.props.groups.length; i++) {
                    tempMap.set(this.props.groups[i].id, this.isCurrentUserMember(this.props.groups[i]));
                }
                this.setState({isMemberMap: tempMap})
            }
        });
    }

    render() {
        return (
            <FlatList style={{flex: 1, padding: 15}} data={this.props.groups} keyExtractor={(item, index) => index.toString()}
                      renderItem={(item) =>
                          <GroupItem showDetail={(currentUserIsMember) => this.showDetail(item.item, currentUserIsMember)}
                                     group={item.item}
                                     currentUserIsMember={this.props.isdisplayingUserGroups ? true : this.state.isMemberMap.get(item.item.id)}
                                     joinGroupMethod={(currentUserIsMember) => this.quitOrJoin(currentUserIsMember, item.item)}
                          />
                      }/>
        )
    }

    isCurrentUserMember(group) {
        if (group.members && group.members.length > 0 && this.currentUser) {
            const currentUserIn = group.members.filter((user) => user.id === this.currentUser.id)[0];
            if (currentUserIn) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    quitOrJoin(currentUserIsMember, group) {
        if (currentUserIsMember) {
            this.userWillQuit(group);
        } else {
            this.groupeService.currentUserJoinGroup(group.id).then(() => {
                this.updateViewGroup(group, true);
            }).catch((error) => {
                console.error(error);
            })
        }
    }
    userWillQuit(group) {
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
                            this.updateViewGroup(group, false);
                        }).catch((error) => {
                            console.error(error);
                        })
                    }
                }
            ]
        )
    }
    ////////////// todo : le setState ne marche pas ici, il faut que ce soit le parent qui transmettent le bon prop MAJ
    updateViewGroup(group, isJoining) {
        let changeOccured = false;
        if (!group.members || group.members === null) {
            group.members = [];
        }
        if (isJoining) {
            const found = group.members.find((userInfo) => this.currentUser.userInfo.id === userInfo.id);
            if(!found || found === null) {
                group.members.push(this.currentUser.userInfo);
                changeOccured = true;
            }
        } else {
            const found = group.members.find((userInfo) => this.currentUser.userInfo.id === userInfo.id);
            if(found && found !== null) {
                group.members.splice(group.members.indexOf(found), 1);
                changeOccured = true;
            }
        }
        if (changeOccured) {
            const currentGroupIndex = this.state.groups.indexOf(this.state.groups.find((groupIn) => groupIn.id === group.id));
            if (currentGroupIndex !== -1) {
                const groupsToUpdate = this.state.groups;
                groupsToUpdate[currentGroupIndex] = group;
                this.setState({groups: groupsToUpdate})
            }
        }
    }
    showDetail(group, currentUserIsMember) {
        this.props.navigation.navigate(ROUTE_DETAIL_GRP, {groupDisplayed: group, isMember: currentUserIsMember, previousRouteIdentifier: this.props.route.name})
    }
}