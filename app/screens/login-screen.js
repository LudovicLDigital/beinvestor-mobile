import React, { Component } from "react";
import {
    Button,
    Text,
    TextInput,
    View
} from "react-native";
import Loader from "../component/subcomponent/loader";
import {styles, appColors} from "../shared/styles/global";
import AuthService from "../shared/services/auth";
const LOGIN = "login";
const PASS = "password";
export default class LoginScreen extends Component {
    passwordTextInput;
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            waitingForConnect: false
        };
    }

    componentDidMount(): void {
        this.autoConnect();
    }

    render() {
        return (
            <View style={[styles.fullScreen, styles.flexCenter]}>
                <Text>Connexion</Text>
                <TextInput placeholder="Identifiant"
                           autoCapitalize="none"
                           onSubmitEditing={() => this.passwordTextInput.focus()}
                           blurOnSubmit={false}
                           onChangeText={text => this.textEnterred(LOGIN, text)}/>
                <TextInput placeholder="Mot de passe"
                           secureTextEntry={true}
                           autoCapitalize="none"
                           ref={(input) => this.passwordTextInput = input}
                           onSubmitEditing={() => this.submitCredentials()}
                           blurOnSubmit={false}
                           onChangeText={text => this.textEnterred(PASS, text)}/>
                <Button title="Se connecter"
                        style={{zIndex: 0}}
                        disabled={this.state.waitingForConnect}
                        onPress={() => this.submitCredentials()}>
                </Button>
                <Loader loadTitle={'Ravi de vous revoir !'} isDisplayed={this.state.waitingForConnect}/>
            </View>
        )
    }
    textEnterred(textInputChanged, text) {
        if (textInputChanged === LOGIN) {
            this.setState({
                login: text
            });
        } else {
            this.setState({
                password: text
            });
        }
    }
    async autoConnect() {
        this.setState({
            waitingForConnect: true
        });
        AuthService.autoLogin().then((isAutoLogged) => {
            this.setState({
                waitingForConnect: false
            });
            if (isAutoLogged) {
                this.props.navigation.navigate("Home");
            }
        });
    }
    async submitCredentials() {
        this.setState({
            waitingForConnect: true
        });
        AuthService.login(this.state.login, this.state.password).then((value) => {
            this.setState({
                waitingForConnect: false
            });
            if (value) {
                this.props.navigation.navigate("Home");
            } else {
                alert("Login ou mot de passe incorrect");
            }
        }).catch((error) => alert(`Une erreur est survenue : ${error.message}`));
    }
}