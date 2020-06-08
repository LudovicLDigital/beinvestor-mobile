import React, {Component} from "react";
import {
    View
} from "react-native";
import {Text} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";
import {APP_INFO} from "../../shared/util/constants";

/**
 * Component to display user's friendly the "Information sur BeInvestor" section
 */
export default class AppInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
                <Text category={'h1'}>{APP_INFO}</Text>
            </View>
        )
    }
}