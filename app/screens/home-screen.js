import React, { Component } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import GroupList from '../component/group/group-list';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: []
        }
    }

    componentDidMount(): void {
        this.recover();
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <GroupList groups={this.state.groups}/>
            </View>
        );
    }

    async recover() {
        this.groupService.getAllGroups().then((groups) => {
            this.setState({
                groups: groups
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}