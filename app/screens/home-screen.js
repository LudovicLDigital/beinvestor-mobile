import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import {SafeAreaView, View, Text} from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import SearchBar from "../component/subcomponent/search-bar";
import {DismissKeyboard} from "../shared/util/ui-helpers";
import SocketService from '../shared/services/socket-service';
import CustomMap from '../component/map/custom-map';
export default class HomeScreen extends Component {
    isMainScreen: boolean;
    constructor(props) {
        super(props);
        this.isMainScreen = true;
    }
    componentDidMount(): void {
        SocketService.connectToBackEnd();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} hideAriane={true} navigation={this.props.navigation}/>
                <DismissKeyboard>
                    <Layout style={{flex:1}}>
                        <View style={[{flex:1}]}>
                            <CustomMap navigation={this.props.navigation}/>
                            <SearchBar style={[styles.absoluteTop, {zIndex: 1000}]} placeholder={'Rechercher une ville'}/>
                        </View>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }
}