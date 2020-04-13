import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import GroupService from '../../shared/services/entities/groups-service';
import GroupMessageService from '../../shared/services/entities/group-message-service';
import { SafeAreaView, View, Alert} from 'react-native';
import { Text, Layout, Button, Icon, Divider } from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import {AddIcon, MembersIcon, SharedFilesIcon} from "../../component/subcomponent/basic-icons";
import {showToast} from "../../shared/util/ui-helpers";
import ChatRoom from "../../component/chat/chatroom";
import { PAGINATION_SIZE, ROUTE_MEMBERS_LIST} from "../../shared/util/constants";
import SocketService from "../../shared/services/socket-service";
/**
 * Passing in route params :
 * - isMember : boolean to know on component load if current user is member of the group
 * - groupDisplayed : the group to show detail
 * - previousRouteIdentifier : the previous route from where user come
 */
export default class GroupDetailScreen extends Component {
    totalMessage;
    page = 0;
    constructor(props) {
        super(props);
        this.state = {
            userIsMember: (this.props.route && this.props.route.params) ? this.props.route.params.isMember : false,
            groupDisplay: this.props.route.params.groupDisplayed,
            previousRouteIdentifier: this.props.route.params.previousRouteIdentifier,
            messageList: []
        };
        this.groupeService = new GroupService();
        this.groupeMessageService = new GroupMessageService();
        this.getInitMessageList();
        this.listenForMessage();
    }
    getInitMessageList() {
        this.groupeMessageService.getAllGroupMessage(this.state.groupDisplay.id, {
            page: this.page,
            numberItem: PAGINATION_SIZE
        }).then((messageList) => {
            if (!this.state.messageList || this.state.messageList.length <= 0) {
                this.totalMessage = messageList.total;
                this.setState({messageList: messageList.results})
            } else {
                this.totalMessage = messageList.total;
                const tempArray = this.state.messageList;
                messageList.results.forEach((message) => {
                    const msgIn = tempArray.find((inMsg) => message.content === inMsg.content && message.userInfoId === inMsg.userInfoId && inMsg.created_at === message.created_at);
                    if (!msgIn) {
                        tempArray.push(message)
                    }
                });
                this.setState({messageList: tempArray})
            }
        }).catch((error) => {
            showToast('Erreur de récupération des messages');
            console.log(error);
        })
    }
    loadNewDatas() {
        if (!this.totalMessage || this.totalMessage > this.state.messageList.length) {
            if (this.page >= 0) {
                this.page= this.page + 1;
                this.getInitMessageList();
            }
        }
    }
    listenForMessage() {
        const that = this;
        SocketService.socketServer.on(`receivedMessage-${that.state.groupDisplay.id}`, function(groupMessage) {
            const messages = [];
            that.state.messageList.forEach((message) => {
                messages.push(message);
            });
            messages.unshift(groupMessage);
            that.setState({messageList: messages});
        });
    }
    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} previousRoute={this.state.previousRouteIdentifier} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    <Text style={[{textAlign: 'center', backgroundColor: appColors.white}, styles.boldedTitle]} category={'h5'}>{this.state.groupDisplay.name}</Text>
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
                                onPress={() => this.quitOrJoin()}
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
                        <ChatRoom groupId={this.state.groupDisplay.id}
                                  disableSendMessage={!this.state.userIsMember}
                                  loadNewDatas={() => this.loadNewDatas()}
                                  messageList={this.state.messageList}/>
                    </Layout>
                </Layout>
            </SafeAreaView>
        );
    }

    quitOrJoin() {
        if (this.state.userIsMember) {
            this.userWillQuit();
        } else {
            this.groupeService.currentUserJoinGroup(this.state.groupDisplay.id).then(() => {
                this.setState({
                    userIsMember: true
                });
                SocketService.joinAChannel(this.state.groupDisplay.id);
            }).catch((error) => {
                console.error(error);
            })
        }
    }
    userWillQuit() {
        Alert.alert(
            `Quitter le groupe ${this.state.groupDisplay.name}?`,
            "Vous ne recevrez plus les notifications liées à ce groupe",
            [
                {
                    text: 'Annuler',
                    onPress: () => {}
                },
                {
                    text: 'Oui',
                    onPress: () => {
                        this.groupeService.currentUserLeftGroup(this.state.groupDisplay.id).then(() => {
                            this.setState({
                                userIsMember: false
                            });
                            SocketService.leaveAGroupChannel(this.state.groupDisplay.id);
                        }).catch((error) => {
                            console.error(error);
                        })
                    }
                }
            ]
        )
    }

    /**
     * show all members of the group
     */
    seeMembers() {
        this.props.navigation.navigate(ROUTE_MEMBERS_LIST, {
            entityLinkedId: this.state.groupDisplay.id,
            usersList: this.state.groupDisplay.members,
            isGroupsMembers: true,
            previousRouteIdentifier: this.props.route.name
        })
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