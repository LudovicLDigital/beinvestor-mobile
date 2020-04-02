import React, { Component } from 'react';
import { View, Image,Text } from 'react-native';
import { Divider, TopNavigation } from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import {Colors} from "react-native/Libraries/NewAppScreen/index";

import {BackAction, MenuAction, SimulatorAction} from "./basic-top-action";

/**
 * PROPS :
 * - showAriane : display the "fil d'ariane" which show the actual position of the user
 * - navigation: pass the actual navigation system
 */
export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.navigationSytem = this.props.navigation;
        this.actualRoute = this.props.route.name;
        console.log(this.actualRoute)
    }
    componentDidMount(): void {
    }
    renderRightControls = (navigationSysteme) => [
        <View style={ [{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]} >
            <MenuAction onPress={() => this.openMenu()}/>
            <Image style={[styles.appIconMedium]} source={require('../../assets/icon.png')}/>
            <SimulatorAction onPress={() => this.goToSimulator(navigationSysteme)}/>
        </View>
    ];
    render() {
        return (
            <View >
                <TopNavigation alignment='center' rightControls={this.renderRightControls(this.navigationSytem)}/>
                <Divider/>
                {this.props.showAriane ?
                        <View style={{backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
                            <BackAction onPress={() => this.backPressed()}/>
                            <Text>{this.actualRoute}</Text>
                        </View>
                    : null}
            </View>
        )
    }

    goToSimulator(navigationSysteme) {
        if(navigationSysteme) {
            navigationSysteme.navigate('Simulator')
        }
    }
    openMenu() {
        this.navigationSytem.openDrawer();
    }

    backPressed() {
        this.navigationSytem.goBack();
    }
}