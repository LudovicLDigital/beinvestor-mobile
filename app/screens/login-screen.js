import React, { Component } from 'react';
import {
    Button,
    Text,
    TextInput,
    View
} from 'react-native';
import styles from '../shared/styles/global';
import AuthService from '../shared/services/auth';
const LOGIN = 'login';
const PASS = 'password';
export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.fullScreenFlexCenter}>
                <Text>Connexion</Text>
                <TextInput placeholder='Identifiant' autoCapitalize='none' onChangeText={text => this.textEnterred(LOGIN, text)}/>
                <TextInput placeholder='Mot de passe' textContentType='password' autoCapitalize='none'  onChangeText={text => this.textEnterred(PASS, text)}/>
                <Button title='Se connecter' onPress={() => this.submitCredentials()}/>
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
    async submitCredentials() {
        AuthService.login(this.state.login, this.state.password).then((value) => {
            if (value) {
                this.props.navigation.navigate('Home');
            } else {
                alert('Login ou mot de passe incorrect');
            }
        }).catch((error) => {
            console.error(error);
            alert(`Une erreur est survenue : ${error.message}`);
        });
    }
}