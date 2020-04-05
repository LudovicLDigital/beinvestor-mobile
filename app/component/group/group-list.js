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
function HeaderGroup({group, currentUserIsMember, joinGroupMethod}) {
    return (
        <Fragment>
            <View style={[{flex: 1}, styles.flexRowAlignCenter, styles.flexRowBetween]}>
                <View style={[styles.flexRowAlignCenter]}>
                    <Icon width={20} height={20} fill={appColors.primary} name='people-outline' />
                    <Text style={{marginLeft: 5}}>{group.members ? group.members.length : 0} membres</Text>
                </View>
                <Button
                    onPress={() => joinGroupMethod(currentUserIsMember)}
                    appearance='outline'
                    status={!currentUserIsMember ? 'success':'danger'}>
                    {!currentUserIsMember ? 'Rejoindre' : 'Quitter'}
                </Button>
            </View>
        </Fragment>
    )
}
function GroupItem({group, currentUserIsMember, joinGroupMethod}) {
    if (group) {
        const lastMessageTime = calculDurationFromNow(group.lastMessage);
        return (
            <View style={{flex: 1}}>
                <Card>
                    <HeaderGroup group={group} currentUserIsMember={currentUserIsMember}
                                 joinGroupMethod={joinGroupMethod}/>
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
 */
export default class GroupList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList style={{flex: 1, padding: 20}} data={this.props.groups} keyExtractor={(item, index) => index.toString()}
                          renderItem={(item) => <GroupItem
                              group={item.item}
                              currentUserIsMember={this.isCurrentUserMember(item.item)}
                              joinGroupMethod={(currentUserIsMember) => this.quitOrJoin(currentUserIsMember, item.item)}
                          />}/>
            </View>
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
        } else {
            alert('JOIN ?') // need to bind group for change
        }
    }
}