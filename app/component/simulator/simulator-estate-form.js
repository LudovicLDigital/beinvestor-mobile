import React, {Component} from "react";
import {
    View
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";

/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : method sending data enterred in the form
 */
export default class SimulatorEstateForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{flex: 1}]}>

            </View>
        )
    }
}