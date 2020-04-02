import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import { SafeAreaView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
export default class AppInfoScreen extends Component {
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
                    <Text>A PROPOS</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}