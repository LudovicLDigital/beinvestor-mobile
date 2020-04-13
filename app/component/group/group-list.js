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
import SocketService from "../../shared/services/socket-service";
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
            this.userWillQuit(group);
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