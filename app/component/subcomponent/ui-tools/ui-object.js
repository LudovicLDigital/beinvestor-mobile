import {appColors, styles} from "../../../shared/styles/global";
import React, { useState, useEffect } from 'react';
import {TouchableWithoutFeedback, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from '@ui-kitten/components';

/**
 * An interactive zone which include an icon at left of the label
 * @param onPressFunction the function which need to be executed on click
 * @param icon the icon to display (Material icon)
 * @param label the text display right of the icon
 * @param displayRequiredStar if the click is needed (like a form to read, a contract or other things)
 * @param iconColor add a specific color for the icon
 * @returns {*}
 * @constructor
 */
export function InteractiveIconLabel({onPressFunction, icon, label, displayRequiredStar, iconColor }) {

    return (
        <TouchableWithoutFeedback onPress={() => onPressFunction()}>
            <View style={[styles.flexRowAlignCenter, {marginBottom: 20, marginLeft: 20}]}>
                <Icon size={30} color={iconColor ? iconColor : appColors.primary} name={icon}/>
                <Text style={{marginLeft: 10}}>{label} {displayRequiredStar ? <Text style={[styles.formStarRequired, {fontSize: 12}]}>  *</Text> : null }</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}