import React, { Component } from 'react';
import {Linking, SafeAreaView, View, Platform} from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import {DismissKeyboard} from "../shared/util/ui-helpers";
import SocketService from '../shared/services/socket-service';
import CustomMap from '../component/map/custom-map';
import {ROUTE_REGISTER, ROUTE_RESET_PASSWORD} from "../shared/util/constants";
export default class HomeScreen extends Component {
    isMainScreen: boolean;
    constructor(props) {
        super(props);
        this.isMainScreen = true;
    }
    componentDidMount(): void {
        SocketService.connectToBackEnd();
        console.log(`===TRYING componentDidMount===`);
        if (Platform.OS === 'android') {
            console.log(`===TRYING Linking===`);
            Linking.getInitialURL().then(url => {
                console.log(`===TRYING url===`);
                console.log(url);
                this._deepNavigate(url);
            });
        } else {
            console.log(`===TRYING Linking addEventListener===`);
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }
    componentWillUnmount(): void {
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL(event) {
        console.log(`===TRYING handleOpenURL===`);
        console.log(event)
        this._deepNavigate(event.url);
    }
    _deepNavigate(url) {
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        if (route.includes('account/activate')) {
            const key = this._recoverKey(route);
            navigate(ROUTE_REGISTER, {activationCode: key});
        } else if(route.includes('account/reset')) {
            const key = this._recoverKey(route);
            navigate(ROUTE_RESET_PASSWORD, {resetKey: key});
        }
    }
    _recoverKey(route) {
        const uriArray = route.split('key=');
        return uriArray[uriArray.length -1];
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} hideAriane={true} navigation={this.props.navigation}/>
                <DismissKeyboard>
                    <Layout style={{flex:1}}>
                        <View style={[{flex:1}]}>
                            <CustomMap navigation={this.props.navigation}/>
                        </View>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }
}