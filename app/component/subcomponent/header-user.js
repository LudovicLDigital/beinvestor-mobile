import React, {Component} from "react";
import {
    View
} from "react-native";
import { Text, Avatar} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";
import AuthService from "../../shared/services/auth";
import ProfilPicturePicker from "./form/profil-picture-picker";

/**
 * PROPS :
 */
export default class HeaderUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }
    componentDidMount() {
        AuthService.getCurrentUser().then((user) => {
            this.setState({currentUser: user})
        });
    }
    render() {
        return (
            <View style={[{flex: 1, marginBottom: 15, marginTop: 15}]}>
                <ProfilPicturePicker isAbleToEdit={false}/>
                <Text category={'h4'} style={{textAlign: 'center'}}>{this.state.currentUser.userInfo?.firstName + ' ' + this.state.currentUser.userInfo?.lastName}</Text>
            </View>
        )
    }
}