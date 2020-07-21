import React, {Component} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import {Text} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BANK, ESTATE, FISCALITY, RENT, SITUATION} from "../../shared/util/constants";

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
                        <Icon size={30} color={appColors.primary} name="location-city"/>
                        <Text style={{marginLeft: 10}}>Bien à analyser <Text style={[styles.formStarRequired, {fontSize: 12}]}>  *</Text></Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={() => this.props.clickedMenu(RENT)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="local-atm"/>
                        <Text style={{marginLeft: 10}}>Loyers <Text style={[styles.formStarRequired, {fontSize: 12}]}>  *</Text></Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={() => this.props.clickedMenu(FISCALITY)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="money-off"/>
                        <Text style={{marginLeft: 10}}>Charges</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.clickedMenu(BANK)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="euro-symbol"/>
                        <Text style={{marginLeft: 10}}>Emprunt bancaire</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={() => this.props.clickedMenu(SITUATION)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="assignment-ind"/>
                        <Text style={{marginLeft: 10}}>Votre situation</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}