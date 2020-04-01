import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Divider, TopNavigation } from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import {BackAction, MenuAction, SimulatorAction} from "./basic-top-action";

/**
 * PROPS :
 * - showNavigationPosition : display the "fil d'ariane" which show the actual position of the user
 */
export default class HeaderBar extends Component {

    constructor(props) {
        super(props);
    }
    goToSimulator() {
        alert('Le simulateur pour la rentabilité de votre projet immobilier arrivera plus tard ! ')
    }
    openMenu() {
        alert('Open MENU ! ')
    }
    renderRightControls = () => [
        <View style={ [{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]} >
            <MenuAction onPress={this.openMenu}/>
            <Image style={[styles.appIconMedium]} source={require('../../assets/icon.png')}/>
            <SimulatorAction onPress={this.goToSimulator}/>
        </View>
    ];
    render() {
        return (
            <View >
                <TopNavigation alignment='center' rightControls={this.renderRightControls()}/>
                <Divider/>
            </View>
        )
    }
}