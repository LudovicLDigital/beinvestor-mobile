import React, {Component} from "react";
import {
    View
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import InputField from '../subcomponent/form/input-field';
import { Text} from '@ui-kitten/components';
/**
 * PROPS :
 * - mail : the user email linked
 */
export default class AccountConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activationCode: null
        }
    }

    render() {
        return (
            <View style={{flex: 1, padding: 15, backgroundColor: appColors.white}}>
                <InputField label={'Code d\'activation'}
                            value={this.state.activationCode}
                            onTextChange={(text) => this.setState({activationCode: text})}/>
            </View>
        )
    }
}