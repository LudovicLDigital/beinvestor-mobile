import React, {Component} from "react";
import {
    Alert,
    BackHandler,
    Image,
    Linking,
    Platform,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Button, Icon, Layout} from '@ui-kitten/components';
import Loader from "../component/subcomponent/loader";
import {styles} from "../shared/styles/global";
import AuthService from "../shared/services/auth";
import {DismissKeyboard} from "../shared/util/ui-helpers";
import {CITATIONS, ROUTE_HOME, ROUTE_REGISTER, ROUTE_RESET_PASSWORD} from "../shared/util/constants";
import InputField from '../component/subcomponent/form/input-field';

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
        this.handleOpenURL = this.handleOpenURL.bind(this);
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
        this._recoverDeepLink();
        this._autoConnect();
        BackHandler.addEventListener("hardwareBackPress", () => this.backAction());
    }
    _recoverDeepLink() {
        Linking.addEventListener('url', this.handleOpenURL);
        if (Platform.OS === 'android') {
            const NativeLinking = require('react-native/Libraries/Linking/NativeLinking').default;
            NativeLinking.getInitialURL().then((initialUrl) => {
                if (initialUrl) {
                    this._deepNavigate(initialUrl);
                }
            });
        } else {
            Linking.getInitialURL().then((initialUrl) => {
                if (initialUrl) {
                    this._deepNavigate(initialUrl);
                }
            });
        }


    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => this.backAction());
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL(event) {
        this._deepNavigate(event.url);
    }
    _deepNavigate(url) {
        const route = url.replace(/.*?:\/\//g, '');
        if (route.includes('account/active')) {
            const key = this._recoverKey(route);
            const mail = this._recoverMail(route);
            this.props.navigation.navigate(ROUTE_REGISTER, {activationCode: key, mail: mail});
        } else if(route.includes('account/reset')) {
            const key = this._recoverKey(route);
            const mail = this._recoverMail(route);
            this.props.navigation.navigate(ROUTE_RESET_PASSWORD, {resetKey: key, mail: mail});
        }
    }
    _recoverKey(route) {
        const uriArray = route.split('key=');
        return uriArray[uriArray.length -1];
    }
    _recoverMail(route) {
        const uriArray = route.split('mail=');
        const params = uriArray[uriArray.length -1].split('&key=');
        return params[0];
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
                        <View style={[{flex:2, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20}]} onLayout={(event) => { this._setEndViewForLoader(event.nativeEvent.layout) }} behavior="position">
                                <Image style={[{alignSelf: 'center'}, styles.appIconLarge]} source={require('../assets/icon.png')}/>
                                <InputField
                                    label={'Login'}
                                    onSubmitEditing={() => this.passwordTextInput.focus()}
                                    blurOnSubmit={false}
                                    onTextChange={text => this.textEnterred(LOGIN, text)}/>
                                <InputField
                                    label={'Mot de passe'}
                                    type={'password'}
                                    value={this.state.password}
                                    messageErrors={[['invalid', 'Mot de passe incorrect']]}
                                    receivedErrorByForm={this.state.oldPasswordError}
                                    onTextChange={(text) => this.textEnterred(PASS, text)}
                                    reference={(input) => this.setRefPass(input)}
                                    onSubmitEditing={() => this._submitCredentials()}
                                    blurOnSubmit={false}/>
                                <Button style={[ styles.backgroundPrimary]}
                                        disabled={this.state.waitingForConnect}
                                        onPress={() => this._submitCredentials()}>
                                    CONNEXION
                                </Button>
                            <Loader loadTitle={this.state.citationForLoading} parentHeight={this.state.credentialsViewHeight} isDisplayed={this.state.waitingForConnect}/>
                        </View>
                        <View style={[{flex: 1}, styles.flexColumnBetween]}>
                            <TouchableWithoutFeedback onPress={() => this._resetPassword()}>
                                <Text style={[styles.textAsLink, {textAlign: 'center'}]}>Mot de passe oublié ?</Text>
                            </TouchableWithoutFeedback>
                            {/* todo: WILL BE ADDED WHEN IMPLEMENT SOCIAL CONNEXIONS*/}
                            {/*<View >*/}
                            {/*<Text style={[styles.inputLabelSecondary, {alignSelf: 'center', marginBottom: 20}]}>Se connecter avec :</Text>*/}
                            {/*<View style={[{flex: 1},styles.flexRowBetween]}>*/}
                            {/*<Button*/}
                            {/*disabled={this.state.waitingForConnect}*/}
                            {/*accessoryLeft ={FacebookIcon}*/}
                            {/*onPress={() => showInfoAlert('La connexion avec Facebook n\'est pas encore disponible')}*/}
                            {/*style={{backgroundColor: '#365899'}}>Facebook</Button>*/}
                            {/*<Button*/}
                            {/*disabled={this.state.waitingForConnect}*/}
                            {/*accessoryLeft ={GoogleIcon}*/}
                            {/*appearance='ghost'*/}
                            {/*onPress={() => showInfoAlert('La connexion avec Google n\'est pas encore disponible')}*/}
                            {/*status='danger'>Google</Button>*/}
                            {/*</View>*/}
                            {/*</View>*/}
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

    _resetPassword() {
        this.props.navigation.navigate(ROUTE_RESET_PASSWORD)
    }

    setRefPass(input) {
        this.passwordTextInput = input;
    }
}