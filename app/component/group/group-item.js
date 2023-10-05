import React, {Component, Fragment} from "react";
import {appColors, styles} from "../../shared/styles/global";
import {View} from 'react-native';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {calculDurationFromNow} from "../../shared/util/ui-helpers";

function HeaderGroup({group, currentUserIsMember, joinGroupMethod}) {
    return (
        <Fragment>
            <View style={[{flex: 1}, styles.flexRowAlignCenter, styles.flexRowBetween]}>
                <View style={[styles.flexRowAlignCenter]}>
                    <Icon width={20} height={20} fill={appColors.primary} name='people-outline' />
                    <Text style={{marginLeft: 5}}>{group.totalMembers} membres</Text>
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
export default class GroupItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.group) {
            const lastMessageTime = calculDurationFromNow(this.props.group.lastMessage);
            return (
                <View style={{flex: 1, marginBottom: 10}}>
                    <Card onPress={() => this.props.showDetail(this.props.currentUserIsMember)}>
                        <HeaderGroup group={this.props.group} currentUserIsMember={this.props.currentUserIsMember}
                                     joinGroupMethod={(IsMember) => this.props.joinGroupMethod(IsMember)}/>
                        <Text category='h4' style={styles.boldedTitle}>{this.props.group.name}</Text>
                        <Text>{lastMessageTime !== -1 ? 'Dernier message il y a' + lastMessageTime : 'Aucun message'}</Text>
                        <View style={styles.flexRowAlignCenter}>
                            <Icon width={20} height={20} fill={appColors.secondary} name='pin-outline'/>
                            <Text category={'h6'}>{this.props.group.city ? this.props.group.city.name : 'Ville inconnue'}</Text>
                        </View>
                        <Text>Pas d'évènements à venir</Text>
                    </Card>
                </View>
            )
        } else return null;
    }
}