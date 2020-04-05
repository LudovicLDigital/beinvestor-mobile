import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import GroupService from '../../shared/services/entities/groups-service';
import { SafeAreaView, View } from 'react-native';
import { Text, Layout, Button, Icon, Divider } from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import {AddIcon, MembersIcon, SharedFilesIcon} from "../../component/subcomponent/basic-icons";
import {showToast} from "../../shared/util/ui-helpers";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import ChatRoom from "../../component/chat/chatroom";
import {MINUTE} from "../../shared/util/constants";
const messageList = [
    {dateSended: new Date(2020, 3, 2, 15, 16), authorName: 'Ludovic', content: 'Bonjour ! Bienvenue à tous les nouveaux qui souhaitent découvrir, calculer et partager leurs projets immobiliers !', userId: 1},
    {dateSended: new Date(2020, 3, 3, 17, 30), authorName: 'Jean', content: 'Merci !', userId: 2},
    {dateSended: new Date(new Date().getTime() - (2 * MINUTE)), authorName: 'Paul', content: 'Bon cash-flow à tous !', userId: 2},
];
/**
 * Passing in route params :
 * - isMember : boolean to know on component load if current user is member of the group
 * - groupDisplayed : the group to show detail
 */
export default class GroupDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIsMember: (this.props.route && this.props.route.params) ? this.props.route.params.isMember : false,
            groupDisplay: this.props.route.params.groupDisplayed,
        };
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    <Text style={[{textAlign: 'center', backgroundColor: Colors.white}, styles.boldedTitle]} category={'h5'}>{this.state.groupDisplay.name}</Text>
                    <Layout style={[{flex: 1}, styles.flexRowBetween]}>
                        <View style={{flex: 2, alignItems: 'flex-start'}}>
                            <Button
                                appearance='ghost'
                                status='basic'
                                onPress={() => this.seeMembers()} icon={MembersIcon}>
                                Membres
                            </Button>
                            <Button
                                appearance='ghost'
                                status='basic'
                                onPress={() => this.seeFiles()}
                                icon={SharedFilesIcon}>
                                Fichiers partagés
                            </Button>
                            <Button
                                status='basic'
                                appearance='ghost'
                                onPress={() => this.seeEvents()}
                                icon={(style) => <Icon {...style} fill={appColors.secondary}  name='bell-outline' />}
                            >
                                Evènements à venir
                            </Button>
                        </View>
                        <View style={[{flex: 1}, styles.flexColumnBetween]}>
                            <Button
                                size={'small'}
                                onPress={() => this.joinOrQuitGroup()}
                                appearance='outline'
                                status={!this.state.userIsMember ? 'success':'danger'}>
                                {!this.state.userIsMember ? 'Rejoindre' : 'Quitter'}
                            </Button>
                            <Button
                                style={[styles.fabButton, {alignSelf: 'flex-end', borderColor: appColors.primary}]}
                                size={'small'}
                                appearance='outline'
                                onPress={() => this.addEvent()}
                                disable={!this.state.userIsMember}
                                icon={AddIcon}>
                            </Button>
                        </View>
                    </Layout>
                    <Layout style={[{flex:2, marginTop: 20}]}>
                        <Divider style={{color: appColors.secondary}}/>
                        <ChatRoom messageList={messageList}/>
                    </Layout>
                </Layout>
            </SafeAreaView>
        );
    }

    joinOrQuitGroup() {
        return undefined;
    }

    /**
     * show a modal with all members of the group
     */
    seeMembers() {
        showToast('see MEMBERS')
    }
    /**
     * Navigate to the the file share dashboard
     */
    seeFiles() {
        showToast('see FILES')
    }

    /**
     * show modal with all futurs event, click on one send to map location with marker
     */
    seeEvents() {
        showToast('see EVENTS')
    }

    /**
     * will open a form modal to create a group event, user can only if have one week old on group and send one or more message
     */
    addEvent() {
        showToast('create EVENTS')
    }
}