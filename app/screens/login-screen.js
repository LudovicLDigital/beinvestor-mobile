import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    SafeAreaView
} from "react-native";
import { Button, Icon, Layout, Input } from '@ui-kitten/components';
import Loader from "../component/subcomponent/loader";
import {styles, appColors} from "../shared/styles/global";
import AuthService from "../shared/services/auth";
const LOGIN = "login";
const PASS = "password";
export const FacebookIcon = (style) => (
    <Icon name='facebook' {...style} />
);
export const GoogleIcon = (style) => (
    <Icon name='google' {...style} />
);
export default class LoginScreen extends Component {
    passwordTextInput;
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            waitingForConnect: false,
            securizedText: true
        };
    }

    componentDidMount(): void {
        this.autoConnect();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Layout style={[styles.fullScreen, styles.flexColumnBetween]}>
                    <KeyboardAvoidingView style={[{flex:2, justifyContent: 'space-between', marginBottom: 20}]} behavior="position">
                        <Image style={[{alignSelf: 'center'}, styles.appIconLarge]} source={require('../assets/icon.png')}/>
                        <Input label="Login"
                               labelStyle={styles.inputLabelPrimary}
                               autoCapitalize="none"
                               style={{borderColor: appColors.primary}}
                               onSubmitEditing={() => this.passwordTextInput.focus()}
                               blurOnSubmit={false}
                               onChangeText={text => this.textEnterred(LOGIN, text)}/>
                        <Input label="Mot de passe"
                               labelStyle={styles.inputLabelPrimary}
                               style={{borderColor: appColors.primary}}
                               secureTextEntry={this.state.securizedText}
                               autoCapitalize="none"
                               icon={(style) => {
                                   const eyeOff = this.state.securizedText;
                                   return (<Icon {...style} name={eyeOff ? 'eye-off':'eye'}/>)
                               }}
                               onIconPress={() => this.setState({securizedText: !this.state.securizedText})}
                               ref={(input) => this.passwordTextInput = input}
                               onSubmitEditing={() => this.submitCredentials()}
                               blurOnSubmit={false}
                               onChangeText={text => this.textEnterred(PASS, text)}/>
                        <Button style={[{zIndex: 0}, styles.backgroundPrimary]}
                                disabled={this.state.waitingForConnect}
                                onPress={() => this.submitCredentials()}>
                            CONNEXION
                        </Button>
                        <Loader loadTitle={'Ravi de vous revoir !'} isDisplayed={this.state.waitingForConnect}/>
                    </KeyboardAvoidingView>
                    <View style={[{flex: 1}, styles.flexColumnBetween]}>
                        <View >
                            <Text style={[styles.inputLabelSecondary, {alignSelf: 'center', marginBottom: 20}]}>Se connecter avec :</Text>
                            <View style={[{flex: 1},styles.flexRowBetween]}>
                                <Button
                                    disabled={this.state.waitingForConnect}
                                    icon={FacebookIcon}
                                    onPress={() => alert('Facebook non disponible')}
                                    style={{backgroundColor: '#365899'}}>Facebook</Button>
                                <Button
                                    disabled={this.state.waitingForConnect}
                                    icon={GoogleIcon}
                                    appearance='ghost'
                                    onPress={() => alert('Google non disponible')}
                                    status='danger'>Google</Button>
                            </View>
                        </View>
                        <Button title="S'INSCRIRE"
                                style={[{zIndex: 0}, styles.backgroundSecondary]}
                                disabled={this.state.waitingForConnect}
                                onPress={() => alert('Inscription non disponible')}>
                            S'INSCRIRE
                        </Button>
                    </View>
                </Layout>
            </SafeAreaView>
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