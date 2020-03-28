import React, { Component } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: []
        }
    }
    render() {
        return (
            <View>
                <Text>{this.state.groups.name}</Text>
                <Button title='all group' onPress={() => this.recover()}/>
            </View>
        );
    }

    async recover() {
        this.groupService.getAllGroups().then((groups) => {
            console.log(`=======SHOWING groups`);
            console.log(groups);
            this.setState({
                groups: groups
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}