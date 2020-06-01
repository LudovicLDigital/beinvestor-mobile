import React, {Component} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import {Text} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BANK, ESTATE, FISCALITY} from "../../shared/util/constants";

/**
 * PROPS :
 * - clickedMenu : return the menu clicked
 */
export default class SimulatorMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.props.clickedMenu(ESTATE)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="home"/>
                        <Text style={{marginLeft: 10}}>Bien à analyser</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.clickedMenu(BANK)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="euro-symbol"/>
                        <Text style={{marginLeft: 10}}>Emprunt bancaire</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={() => this.props.clickedMenu(FISCALITY)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="account-balance"/>
                        <Text style={{marginLeft: 10}}>Fiscalité</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}