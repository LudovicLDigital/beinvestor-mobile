import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    BackHandler, Alert,
    KeyboardAvoidingView,
    SafeAreaView
} from "react-native";
import { Button, Icon, Layout, Input } from '@ui-kitten/components';
import Loader from "../component/subcomponent/loader";
import {styles, appColors} from "../shared/styles/global";
import AuthService from "../shared/services/auth";
import {DismissKeyboard, showInfoAlert} from "../shared/util/ui-helpers";
import {CITATIONS, ROUTE_HOME, ROUTE_REGISTER} from "../shared/util/constants";
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
        const citIndex = Math.floor(Math.random() * 5);
        this.state = {
            login: "",
            password: "",
            waitingForConnect: false,
            securizedText: true,
            credentialsViewHeight: null,
            citationForLoading: CITATIONS[citIndex]
        };
    }
    backAction() {
        Alert.alert(
            "Attention ! ",
            "Voulez vous quitter l'application ?",
            [
                {
                    text: "Non",
                    onPress: () => null,
                    style: "cancel"
                },
                {text: "Oui", onPress: () => BackHandler.exitApp()}
            ]);
        return true;
    };
    componentDidMount(): void {
        this._autoConnect();
        BackHandler.addEventListener("hardwareBackPress", () => this.backAction());
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => this.backAction());
    }

    _setEndViewForLoader(layout) {
        const {height} = layout;
        this.setState({
            credentialsViewHeight: height
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <DismissKeyboard>
                    <Layout style={[styles.fullScreen, styles.flexColumnBetween]}>
                        <KeyboardAvoidingView style={[{flex:2, justifyContent: 'space-between', marginBottom: 20}]} onLayout={(event) => { this._setEndViewForLoader(event.nativeEvent.layout) }} behavior="position">
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
                                   onSubmitEditing={() => this._submitCredentials()}
                                   blurOnSubmit={false}
                                   onChangeText={text => this.textEnterred(PASS, text)}/>
                            <Button style={[{zIndex: 0}, styles.backgroundPrimary]}
                                    disabled={this.state.waitingForConnect}
                                    onPress={() => this._submitCredentials()}>
                                CONNEXION
                            </Button>
                            <Loader loadTitle={this.state.citationForLoading} parentHeight={this.state.credentialsViewHeight} isDisplayed={this.state.waitingForConnect}/>
                        </KeyboardAvoidingView>
                        <View style={[{flex: 1}, styles.flexColumnBetween]}>
                            <View >
                                <Text style={[styles.inputLabelSecondary, {alignSelf: 'center', marginBottom: 20}]}>Se connecter avec :</Text>
                                <View style={[{flex: 1},styles.flexRowBetween]}>
                                    <Button
                                        disabled={this.state.waitingForConnect}
                                        icon={FacebookIcon}
                                        onPress={() => showInfoAlert('La connexion avec Facebook n\'est pas encore disponible')}
                                        style={{backgroundColor: '#365899'}}>Facebook</Button>
                                    <Button
                                        disabled={this.state.waitingForConnect}
                                        icon={GoogleIcon}
                                        appearance='ghost'
                                        onPress={() => showInfoAlert('La connexion avec Google n\'est pas encore disponible')}
                                        status='danger'>Google</Button>
                                </View>
                            </View>
                            <Button title="S'INSCRIRE"
                                    style={[{zIndex: 0}, styles.backgroundSecondary]}
                                    disabled={this.state.waitingForConnect}
                                    onPress={() => this._goToRegister()}>
                                S'INSCRIRE
                            </Button>
                        </View>
                    </Layout>
                </DismissKeyboard>
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
    async _autoConnect() {
        this.setState({
            waitingForConnect: true
        });
        AuthService.autoLogin().then((isAutoLogged) => {
            this.setState({
                waitingForConnect: false
            });
            if (isAutoLogged) {
                this.props.navigation.navigate(ROUTE_HOME);
            }
        });
    }
    async _submitCredentials() {
        this.setState({
            waitingForConnect: true
        });
        AuthService.login(this.state.login, this.state.password).then((value) => {
            this.setState({
                waitingForConnect: false
            });
            if (value) {
                this.props.navigation.navigate(ROUTE_HOME);
            } else {
                Alert.alert(
                    "Attention ! ",
                    "Login ou mot de passe incorrect",
                    [
                        {text: "Oups", onPress: () => {}}
                    ]);
            }
        }).catch((error) => alert(`Une erreur est survenue : ${error.message}`));
    }

    _goToRegister() {
        this.props.navigation.navigate(ROUTE_REGISTER)
    }
}