import React, { useEffect, useState} from "react";
import {Input, Text} from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import ChatBubble from "./chat-bubble";
import {SendIcon} from "../subcomponent/ui-tools/basic-icons";
import AuthService from "../../shared/services/auth";
import {styles} from "../../shared/styles/global";
import GroupMessageService from '../../shared/services/entities/group-message-service'
import {showToast} from "../../shared/util/ui-helpers";
import BeInvestorOneSignalPushService from "../../shared/services/one-signal-push-service";
import {useStoreState} from "easy-peasy";
/**
 * PROPS :
 * - messageList: the list of messages
 * - groupId: the id of the chatroom's group
 * - loadNewDatas: callback for load more datas
 * - disableSendMessage: boolean to disable the text input for message sending
 */
export default function ChatRoom({props, messageList, groupId, loadNewDatas, disableSendMessage }) {
    const userDeviceId = useStoreState((state) => state.userDeviceId);
    const [currentUser, setCurrentUser] = useState(null);
    const [textMessage, setTextMessage] = useState('');
    const [flatList, setFlatList] = useState(null);
    const groupMessageService = new GroupMessageService();

    useEffect(() => {
        AuthService.getCurrentUser().then((currentUserAuth) => {
            setCurrentUser(currentUserAuth);
        });
    }, []);

    function callBackDatas() {
        if (loadNewDatas) {
            loadNewDatas()
        }
    }

    function sendMessage() {
        if (!disableSendMessage) {
            const messageToSend = {
                authorName: currentUser.user.userInfo.firstName ? currentUser.user.userInfo.firstName : currentUser.user.login,
                content: textMessage,
                userInfoId: currentUser.user.userInfo.id,
                groupId: groupId
            };
            setTextMessage(null);
            const pushMessage = `${messageToSend.authorName} : ${messageToSend.content}`;
            BeInvestorOneSignalPushService.sendNotification(pushMessage, messageToSend.groupId, userDeviceId);
            groupMessageService.postAndEmitAmessage(messageToSend).then(() => {
            }, (error) => {
                    showToast('Le message n\'a pas pu être envoyé');
                    console.error(error)
            });
        }
    }


    return (
        <View style={{flex: 1, padding: 15, paddingBottom: 0}}>
            {messageList && messageList.length > 0 ?
                <FlatList data={messageList}
                          extraDate={messageList}
                          ref={(flatList) => setFlatList(flatList)}
                          keyExtractor={(item, index) => index.toString()}
                          inverted={-1}
                          onEndReachedThreshold={0.3}
                          onEndReached={() => callBackDatas()}
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
                   disabled={disableSendMessage}
                   onIconPress={() => sendMessage()}
                   value={textMessage}
                   onSubmitEditing={() => sendMessage()}
                   onChangeText={text => setTextMessage(text)}/>
        </View>
    );
}