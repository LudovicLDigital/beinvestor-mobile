import React, { Component } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import styles from '../shared/styles/global';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recoverredValue: ''
        }
    }
    render() {
        return (
            <View>
                <Text>{this.state.recoverredValue}</Text>
                <Button title='token ?' onPress={() => this.recover()}/>
            </View>
        );
    }

    recover() {
    }
}