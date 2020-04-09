import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import AuthService from "../../shared/services/auth";
import {calculDurationFromNow} from "../../shared/util/ui-helpers";
const chatBubblesStyle = StyleSheet.create({
    bubbleDefault: {
        borderRadius: 15,
        padding: 10,
    },
    mainContainerCurrentUser: {
        position: "relative",
        marginBottom: 5,
        right: 0,
        marginLeft: 20
    },
    mainContainerOtherUser: {
        position: "relative",
        marginBottom: 5,
        left: 0,
        marginRight: 20
    },
    textHeader: {
        color: appColors.black,
        backgroundColor: appColors.white
    },
    textIn: {
        color: appColors.white,
    }
});
/**
 * PROPS :
 * - messageToDisplay : the message to display, must be {dateSended: Date, authorName: string, content: string, userId: number}
 *
 */
export default class ChatBubble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwner: false,
            bubbleColor: styles.backgroundSecondary,
            containerStyler: chatBubblesStyle.mainContainerOtherUser,
        };
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
            if (this.currentUser.userInfo.id === this.props.messageToDisplay.userInfoId) {
                this.setState({
                    isOwner: true,
                    bubbleColor: styles.backgroundPrimary,
                    containerStyler: chatBubblesStyle.mainContainerCurrentUser
                });
            }
        });
    }
    togglePositionTextHeader() {
        const text1 = !this.state.isOwner ? this.props.messageToDisplay.authorName : `Il y a ${calculDurationFromNow(this.props.messageToDisplay.dateSended)}`;
        const text2 = !this.state.isOwner ? `Il y a ${calculDurationFromNow(this.props.messageToDisplay.dateSended)}` : 'Vous';
        return(
            <View style={styles.flexRowBetween}>
                <Text>{text1}</Text>
                <Text>{text2}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={[{flex:1}, this.state.containerStyler]}>
                {this.togglePositionTextHeader()}
                <View style={[{flex: 1}, chatBubblesStyle.bubbleDefault, this.state.bubbleColor]}>
                    <Text style={chatBubblesStyle.textIn}>{this.props.messageToDisplay.content}</Text>
                </View>
            </View>
        )
    }
}