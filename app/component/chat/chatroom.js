import React, {Component} from "react";
import { Input, Text } from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import ChatBubble from "./chat-bubble";
import {SendIcon} from "../subcomponent/basic-icons";
import AuthService from "../../shared/services/auth";
import {styles} from "../../shared/styles/global";
import GroupMessageService from '../../shared/services/entities/group-message-service'
import {showToast} from "../../shared/util/ui-helpers";
/**
 * PROPS :
 * - messageList: the list of messages
 * - groupId: the id of the chatroom's group
 * - loadNewDatas: callback for load more datas
 * - disableSendMessage: boolean to disable the text input for message sending
 */
export default class ChatRoom extends Component {
    flatList;
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
        };
        this.groupMessageService = new GroupMessageService();
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    callBackDatas() {
        if (this.props.loadNewDatas) {
            this.props.loadNewDatas()
        }
    }

    render() {
        return (
            <View style={{flex: 1, padding: 15, paddingBottom: 0}}>
                {this.props.messageList && this.props.messageList.length > 0 ?
                    <FlatList data={this.props.messageList}
                              extraDate={this.props.messageList}
                              ref={(flatList) => this.flatList = flatList}
                              keyExtractor={(item, index) => index.toString()}
                              inverted={-1}
                              onEndReachedThreshold={0.3}
                              onEndReached={() => this.callBackDatas()}
                              renderItem={({item, index, separators}) =>
                                  <ChatBubble
                                      messageToDisplay={item}
                                  />}
                    />
                    :
                    <Text category={'h4'} style={[styles.boldedTitle, {flex: 5, textAlign: 'center', marginTop: 35}]}>Aucun message pour le moment</Text>
                }
                <Input placeholder={'Dire quelque chose ...'}
                       accessoryLeft={SendIcon}
                       disabled={this.props.disableSendMessage}
                       onIconPress={() => this.sendMessage()}
                       value={this.state.textMessage}
                       onSubmitEditing={() => this.sendMessage()}
                       onChangeText={text => this.textChange(text)}/>
            </View>
        )
    }

    sendMessage() {
        if (!this.props.disableSendMessage) {
            const messageToSend = {
                authorName: this.currentUser.userInfo.firstName,
                content: this.state.textMessage,
                userInfoId: this.currentUser.user.id,
                groupId: this.props.groupId
            };
            this.textChange(null);
            this.groupMessageService.postAndEmitAmessage(messageToSend).then(() => {
            }, (error) => {
                    showToast('Le message n\'a pas pu être envoyé');
                    console.error(error)
            });
        }
    }

    textChange(text) {
        this.setState({
            textMessage: text
        })
    }
}