import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import GroupList from '../component/group/group-list';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
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
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation title='BeInvestor' alignment='center'/>
                <Divider/>
                <Layout style={styles.fullScreen}>
                    <GroupList groups={this.state.groups}/>
                </Layout>
            </SafeAreaView>
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