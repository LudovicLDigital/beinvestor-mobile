import React, { Component } from 'react';
import { View, Image,Text } from 'react-native';
import { Divider, TopNavigation } from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";

import {BackAction, MenuAction, SimulatorAction} from "./basic-top-action";
import {convertRouteNameToLisible} from "../../shared/util/converter-for-route-name";

/**
 * PROPS :
 * - hideAriane : hide the "fil d'ariane" which show the actual position of the user
 * - navigation: pass the actual navigation system
 * - previousRoute: pass the previous route of navigation system
 */
export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.navigationSytem = this.props.navigation;
        this.previousRoute = convertRouteNameToLisible(this.props.previousRoute);
        if (this.previousRoute && this.previousRoute !== null) {
            this.actualRoute = this.previousRoute + ' < ' + convertRouteNameToLisible(this.props.route);
        } else {
            this.actualRoute = convertRouteNameToLisible(this.props.route);
        }
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
                {!this.props.hideAriane ?
                        <View style={{backgroundColor: appColors.white, flexDirection: 'row', alignItems: 'center'}}>
                            <BackAction onPress={() => this.backPressed()}/>
                            <Text style={{fontWeight: 'bold'}}>{this.actualRoute}</Text>
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