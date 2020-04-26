import React, {Component} from "react";
import {
    View,
    Dimensions
} from "react-native";

import {
    Text,
    Icon
} from '@ui-kitten/components';
import {styles, appColors, deviceWidth, deviceHeigth} from "../../shared/styles/global";
/**
 * PROPS :
 * - textDisplay : the text to display
 * - iconName: the name for the icon
 * - colorIcon: the icon of the icon
 */
export default class FieldWithIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.flexRowAlignCenter}>
                <Icon width={deviceWidth/15} height={deviceWidth/15} fill={this.props.colorIcon} name={this.props.iconName}/>
                <Text category={'h6'}>{this.props.textDisplay}</Text>
            </View>
        )
    }
}