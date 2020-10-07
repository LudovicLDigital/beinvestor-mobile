import React, {Component} from 'react';
import {styles} from "../shared/styles/global";
import {SafeAreaView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import {ToggleNotifications, ContactSupportButton, DeleteAccountButton} from "../component/subcomponent/settings";


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    <ToggleNotifications/>
                    <ContactSupportButton/>
                    <DeleteAccountButton navigation={this.props.navigation}/>
                </Layout>
            </SafeAreaView>
        );
    }
}