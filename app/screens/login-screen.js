import React, { Component } from 'react';
import {
    Button,
    Text,
    TextInput,
    View
} from 'react-native';
import styles from '../shared/styles/global';
const LOGIN = 'login';
const PASS = 'password';
export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        }
    }
    render() {
        return (
            <View style={styles.fullScreenFlexCenter}>
                <Text>Connexion</Text>
                <TextInput placeholder='Identifiant' onChangeText={text => this.textEnterred(LOGIN, text)}/>
                <TextInput placeholder='Mot de passe' onChangeText={text => this.textEnterred(PASS, text)}/>
                <Button title='Se connecter' onPress={() => this.submitCredentials()}/>
            </View>
        )
    }
    textEnterred(textInputChanged, text) {
        if (textInputChanged === LOGIN) {
            console.log('----LOGIN----');
            this.setState({
                login: text
            });
        } else {
            console.log('-----PASS----');
            this.setState({
                password: text
            });
        }
        console.log(text);
    }
    submitCredentials() {
        console.log(`CREDENTIALS ARE ${this.state.login} -- ${this.state.password}`);
        this.props.navigation.navigate('Home');
    }
}