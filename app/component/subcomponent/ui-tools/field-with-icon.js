import React, {Component} from "react";
import {View} from "react-native";

import {Icon, Text} from '@ui-kitten/components';
import {deviceWidth, styles} from "../../../shared/styles/global";

/**
 * PROPS :
 * - textDisplay : the text to display
 * - iconName: the name for the icon
 * - colorIcon: the icon of the icon
 * - textCategory: the category ('h4' ...) for the displayed text
 *
 */
export default class FieldWithIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.flexRowAlignCenter}>
                <Icon width={deviceWidth/15} height={deviceWidth/15} fill={this.props.colorIcon} name={this.props.iconName}/>
                <Text category={this.props.textCategory}>{this.props.textDisplay}</Text>
            </View>
        )
    }
}