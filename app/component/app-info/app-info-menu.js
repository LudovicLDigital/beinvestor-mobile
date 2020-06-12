import React, {Component} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import {Text} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {APP_INFO, CGU, ML} from "../../shared/util/constants";

/**
 * PROPS :
 * - clickedMenu : return the menu clicked
 */
export default class AppInfoMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableWithoutFeedback  onPress={() => this.props.clickedMenu(APP_INFO)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="help"/>
                        <Text style={{marginLeft: 10}}>{APP_INFO}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.clickedMenu(CGU)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="description"/>
                        <Text style={{marginLeft: 10}}>{CGU}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.clickedMenu(ML)}>
                    <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                        <Icon size={30} color={appColors.primary} name="assignment"/>
                        <Text style={{marginLeft: 10}}>{ML}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}