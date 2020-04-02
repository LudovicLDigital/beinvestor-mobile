import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import { SafeAreaView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
export default class GroupDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar {...this.props} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    <Text>GROUP DETAIL</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}