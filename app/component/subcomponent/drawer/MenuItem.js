import React, {Component} from "react";
import {
    View,
    TouchableWithoutFeedback
} from "react-native";
import {Text, Icon} from '@ui-kitten/components';
import {styles, appColors, deviceWidth} from "../../../shared/styles/global";

/**
 * PROPS :
 * - label : the label of the menu
 * - isFocused : boolean to set focus style
 * - icon : the function for icon
 * - onSelect : the function call on click
 */
export default class MenuItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this._callParentPress()}>
                <View style={{flex:1,marginBottom: deviceWidth/20, flexDirection: 'row', alignItems: 'center', borderLeftWidth: this.props.isFocused ? 5 : 0, borderLeftColor: appColors.secondary}} >
                    <Icon width={deviceWidth/15}
                          height={deviceWidth/15}
                          fill={this.props.isFocused ? appColors.secondary : appColors.primary} style={{marginRight: deviceWidth/20, marginLeft: deviceWidth/20}}
                          name={this.props.icon}/>
                    <Text style={{color: this.props.isFocused ? appColors.secondary : appColors.primary}}>{this.props.label}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _callParentPress() {
        this.props.onSelect();
    }
}