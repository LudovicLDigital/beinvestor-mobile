import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import {SafeAreaView, View, Text} from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import SearchBar from "../component/subcomponent/search-bar";
import {DismissKeyboard} from "../shared/util/ui-helpers";
export default class HomeScreen extends Component {
    isMainScreen: boolean;
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: [],
        };
        this.isMainScreen = true;
    }
    componentDidMount(): void {
        // this.recover();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} hideAriane={true} navigation={this.props.navigation}/>
                <DismissKeyboard>
                    <Layout style={styles.fullScreen}>
                        <View style={[{flex:1}, styles.backgroundPrimary]}>
                            <SearchBar style={styles.absoluteTop} placeholder={'Rechercher une ville'}/>
                            <Text>MAP</Text>
                        </View>
                    </Layout>
                </DismissKeyboard>
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