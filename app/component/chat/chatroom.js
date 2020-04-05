import React, {Component} from "react";
import { Input } from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import ChatBubble from "./chat-bubble";
import {SendIcon} from "../subcomponent/basic-icons";
import AuthService from "../../shared/services/auth";
/**
 * PROPS :
 * - messageList: the list of messages
 */
export default class ChatRoom extends Component {
    flatList;
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
        };
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    componentDidMount(): void {
       this.flatList.scrollToEnd(false) // don't work
    }

    render() {
        return (
            <View style={{flex: 1, padding: 15, paddingBottom: 0}}>
                <FlatList data={this.props.messageList}
                          ref={(flatList) => this.flatList = flatList}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={(item) =>
                              <ChatBubble
                                  messageToDisplay={item.item}
                              />}
                />
                <Input placeholder={'Dire quelque chose ...'}
                       icon={SendIcon}
                       value={this.state.textMessage}
                       onSubmitEditing={() => this.sendMessage()}
                       onChangeText={text => this.textChange(text)}/>
            </View>
        )
    }

    sendMessage() {
        const messageToSend = {
            dateSended: new Date(),
            authorName: this.currentUser.userInfo.firstName,
            content: this.state.textMessage,
            userId: this.currentUser.user.id
        };
        this.textChange(null)
    }

    textChange(text) {
        this.setState({
            textMessage: text
        })
    }
}