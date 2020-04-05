import React, {Component, Fragment} from "react";
import {styles, appColors} from "../../shared/styles/global";
import {FlatList, View} from 'react-native';
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
function GroupItem({group, currentUserIsMember, joinGroupMethod, showDetail}) {
    if (group) {
        const lastMessageTime = calculDurationFromNow(group.lastMessage);
        return (
            <View style={{flex: 1, marginBottom: 10}} >
                <Card onPress={() => showDetail(currentUserIsMember)}>
                    <HeaderGroup group={group} currentUserIsMember={currentUserIsMember}
                                 joinGroupMethod={(IsMember) => joinGroupMethod(IsMember)}/>
                    <Text category='h4' style={styles.boldedTitle}>{group.name}</Text>
                    <Text>{lastMessageTime !== -1 ? 'Dernier message il y a' + lastMessageTime : 'Aucun message'}</Text>
                    <View style={styles.flexRowAlignCenter}>
                        <Icon width={20} height={20} fill={appColors.secondary} name='pin-outline'/>
                        <Text category={'h6'}>{group.city ? group.city.name : 'Ville inconnue'}</Text>
                    </View>
                    <Text>Pas d'évènements à venir</Text>
                </Card>
            </View>
        )
    } else return null;
}
/**
 * PROPS :
 * - groups: the list of group
 * - isdisplayingUserGroups: if the current list display only group of the current user
 */
export default class GroupList extends Component {
    constructor(props) {
        super(props);
        this.groupeService = new GroupService();
    }

    render() {
        return (
            <FlatList style={{flex: 1, padding: 15}} data={this.props.groups} keyExtractor={(item, index) => index.toString()}
                      renderItem={(item) =>
                          <GroupItem
                              showDetail={(currentUserIsMember) => this.showDetail(item.item, currentUserIsMember)}
                              group={item.item}
                              currentUserIsMember={this.props.isdisplayingUserGroups ? true : this.isCurrentUserMember(item.item)}
                              joinGroupMethod={(currentUserIsMember) => this.quitOrJoin(currentUserIsMember, item.item)}
                          />
                      }/>
        )
    }

    isCurrentUserMember(group) {
        if (group.members && group.members.length > 0) {
            return AuthService.getCurrentUser().then((currentUser) => {
                this.currentUser = currentUser;
                const currentUserIn = group.members.filter((user) => user.id === this.currentUser.id)[0];
                if (currentUserIn) {
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            return false;
        }
    }

    quitOrJoin(currentUserIsMember, group) {
        if (currentUserIsMember) {
            alert('QUIT ?')
            this.groupeService.currentUserLeftGroup(group.id).then(() => {}).catch((error) => {
                console.error(error);
            })
        } else {
            this.groupeService.currentUserJoinGroup(group.id).then(() => {}).catch((error) => {
                console.error(error);
            })
        }
    }

    showDetail(group, currentUserIsMember) {
        this.props.navigation.navigate(ROUTE_DETAIL_GRP, {groupDisplayed: group, isMember: currentUserIsMember})
    }
}