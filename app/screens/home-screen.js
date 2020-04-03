import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import {SafeAreaView, View, Text} from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
export default class HomeScreen extends Component {
    isMainScreen: boolean;
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: []
        };
        this.isMainScreen = true;
    }
    componentDidMount(): void {
        this.recover();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} hideAriane={true} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    <View style={[{flex:1}, styles.backgroundPrimary]}>
                        <Text>MAP</Text>
                    </View>
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