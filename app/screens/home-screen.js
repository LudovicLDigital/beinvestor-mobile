import React, { Component } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import {styles, appColors} from "../shared/styles/global";
import DeviceStorage from '../shared/util/device-storage'
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

    async recover() {
        const token = await DeviceStorage.getCurrentUserToken();
        console.log(token)
        this.setState({
            recoverredValue: token
        })
    }
}