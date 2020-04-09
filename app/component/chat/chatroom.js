import React, {Component} from "react";
import { Input, Text } from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import ChatBubble from "./chat-bubble";
import {SendIcon} from "../subcomponent/basic-icons";
import AuthService from "../../shared/services/auth";
import SocketService from "../../shared/services/socket-service";
import {styles} from "../../shared/styles/global";
/**
 * PROPS :
 * - messageList: the list of messages
 * - groupId: the id of the chatroom's group
 * - loadNewDatas: callback for load more datas
 */
export default class ChatRoom extends Component {
    flatList;
    haveScroll: false;
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
        };
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    callBackDatas(info) {
        if (this.props.loadNewDatas) {
            this.props.loadNewDatas(info)
        }
    }

    render() {
        return (
            <View style={{flex: 1, padding: 15, paddingBottom: 0}}>
                {this.props.messageList && this.props.messageList.length > 0 ?
                    <FlatList data={this.props.messageList}
                              ref={(flatList) => this.flatList = flatList}
                              keyExtractor={(item, index) => index.toString()}
                              inverted={-1}
                              onEndReachedThreshold={0.3}
                              onEndReached={(info) => this.callBackDatas(info)}
                              renderItem={(item) =>
                                  <ChatBubble
                                      messageToDisplay={item.item}
                                  />}
                    />
                    :
                    <Text category={'h4'} style={[styles.boldedTitle, {textAlign: 'center', marginTop: 35}]}>Aucun message pour le moment</Text>
                }
                <Input placeholder={'Dire quelque chose ...'}
                       icon={SendIcon}
                       onIconPress={() => this.sendMessage()}
                       value={this.state.textMessage}
                       onSubmitEditing={() => this.sendMessage()}
                       onChangeText={text => this.textChange(text)}/>
            </View>
        )
    }

    sendMessage() {
        const messageToSend = {
            authorName: this.currentUser.userInfo.firstName,
            content: this.state.textMessage,
            userInfoId: this.currentUser.user.id,
            groupId: this.props.groupId
        };
        this.textChange(null);
        SocketService.emitAMessage(messageToSend)
    }

    textChange(text) {
        this.setState({
            textMessage: text
        })
    }
}