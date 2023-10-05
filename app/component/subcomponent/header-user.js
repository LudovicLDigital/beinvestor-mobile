import React, {Component} from "react";
import {View} from "react-native";
import {Text} from '@ui-kitten/components';
import AuthService from "../../shared/services/auth";
import ProfilPicturePicker from "./form/profil-picture-picker";

/**
 * PROPS :
 */
export default class HeaderUser extends Component {
    constructor(props) {
        super(props);
        const defaultUserInfo = {
            userInfo: {
                firstName: '',
                lastName: ''
            }
        };
        this.state = {
            currentUser: defaultUserInfo
        }
    }
    componentDidMount() {
        AuthService.getCurrentUser().then((user) => {
            if (user) {
                this.setState({currentUser: user})
            }
        });
    }
    render() {
        return (
            <View style={[{flex: 1, marginBottom: 15, marginTop: 15}]}>
                <ProfilPicturePicker isAbleToEdit={false}/>
                <Text category={'h4'} style={{textAlign: 'center'}}>
                    {this.state.currentUser.userInfo.firstName ? this.state.currentUser.userInfo.firstName : this.state.currentUser.login}
                    </Text>
            </View>
        )
    }
}