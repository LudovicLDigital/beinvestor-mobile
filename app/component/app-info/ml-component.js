import React, {Component} from "react";
import {
    View
} from "react-native";
import {Text} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";
import { ML} from "../../shared/util/constants";

/**
 * Component to display user's friendly the "mention légales" section
 */
export default class MLComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
                <Text category={'h1'}>{ML}</Text>
            </View>
        )
    }
}