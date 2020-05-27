import React, {Component} from "react";
import {
    Text,
    View
} from "react-native";
import {
    Button,
    Card,
    Text,
    Icon
} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";

/**
 * PROPS :
 * - title : the title of the card
 *  Accept childrens
 */
export default class SimulatorCardResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
                {this.props.children}
            </View>
        )
    }
}