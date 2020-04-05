import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import AuthService from "../../shared/services/auth";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import {calculDurationFromNow} from "../../shared/util/ui-helpers";
const specificStyle = StyleSheet.create({
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
        color: Colors.black,
        backgroundColor: Colors.white
    },
    textIn: {
        color: Colors.white,
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
            containerStyler: specificStyle.mainContainerOtherUser,
        };
        AuthService.getCurrentUser().then((currentUser) => {
            this.currentUser = currentUser;
            if (currentUser.user.id === this.props.messageToDisplay.userId) {
                this.setState({
                    isOwner: true,
                    bubbleColor: styles.backgroundPrimary,
                    containerStyler: specificStyle.mainContainerCurrentUser
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
                <View style={[{flex: 1}, specificStyle.bubbleDefault, this.state.bubbleColor]}>
                    <Text style={specificStyle.textIn}>{this.props.messageToDisplay.content}</Text>
                </View>
            </View>
        )
    }
}