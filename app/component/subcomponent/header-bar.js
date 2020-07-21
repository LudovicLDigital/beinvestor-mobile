import React, {Component} from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Divider, TopNavigation} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MenuAction, SimulatorAction} from "./basic-top-action";
import {convertRouteNameToLisible} from "../../shared/util/converter-for-route-name";
import {ROUTE_HOME, ROUTE_MAP, ROUTE_SIMULATOR} from "../../shared/util/constants";

/**
 * PROPS :
 * - hideAriane : hide the "fil d'ariane" which show the actual position of the user
 * - navigation: pass the actual navigation system
 * - previousRoute: pass the previous route of navigation system
 * - overrideBackPress: pass a method to override the behavior of back
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
        this.renderRightControls = this.renderRightControls.bind(this);
    }
    componentDidMount(): void {
    }
    renderRightControls(navigationSysteme) {
        return (
            <View style={ [{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]} >
                <MenuAction onPress={() => this.openMenu()}/>
                <Image style={[styles.appIconMedium]} source={require('../../assets/icon.png')}/>
                <SimulatorAction onPress={() => this.goToSimulator(navigationSysteme)}/>
            </View>
        )
    };
    render() {
        return (
            <View >
                <TopNavigation alignment='center' accessoryRight={() => this.renderRightControls(this.navigationSytem)}/>
                <Divider/>
                {!this.props.hideAriane &&
                <View style={{backgroundColor: appColors.white, flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => this.backPressed()} >
                        <Icon size={20} name='arrow-back' />
                    </TouchableWithoutFeedback>
                    <Text style={{fontWeight: 'bold'}}>{this.actualRoute}</Text>
                </View>}
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
        if (!this.props.overrideBackPress) {
            if (this.previousRoute === ROUTE_SIMULATOR) {
                this.navigationSytem.popToTop();
            } else {
                this.navigationSytem.goBack();
            }
        } else {
            this.props.overrideBackPress();
        }
    }
}