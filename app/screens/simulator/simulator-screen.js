import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import { SafeAreaView, View} from 'react-native';
import { Text, Layout} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SimulatorMenu from "../../component/simulator/simulator-menu";
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class SimulatorScreen extends Component {
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
                    <SimulatorMenu/>
                    <Icon.Button name="insert-chart" backgroundColor={appColors.success} style={{justifyContent: 'center'}}>
                        Évaluer mon projet
                    </Icon.Button>
                </Layout>
            </SafeAreaView>
        );
    }
}