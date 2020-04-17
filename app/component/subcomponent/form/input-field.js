import React, {Component} from "react";
import { Input, Icon} from '@ui-kitten/components';
import {styles, appColors} from "../../../shared/styles/global";

/**
 * PROPS :
 * - label : label of the field
 * - messageError : message for errors of the field
 * - data : the data string to display in the field
 * - type : the type of input 'password', 'password-show', 'numeric', 'email-address'
 * - onTextChange: call back when text change
 */
export default class  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type === 'password' || this.props.type === 'password-show') {
            return (
                <Input label={this.props.label}
                       size={'medium'}
                       labelStyle={styles.inputLabelPrimary}
                       style={[{borderColor: appColors.primary, flex: 1}, this.props.style]}
                       status={this.props.messageError === null ? '' : 'danger'}
                       secureTextEntry={this.props.type === 'password'}
                       caption={this.props.messageError === null ? '' : this.props.messageError}
                       icon={(style) => {
                           const eyeOff = this.props.type === 'password';
                           return (<Icon {...style} fill={appColors.primary} name={eyeOff ? 'eye-off' : 'eye'}/>)
                       }}
                       captionStyle={{fontWeight: 'bold'}}
                       onChangeText={text => this._textChange(text)}/>
            )
        } else {
            return (
                <Input label={this.props.label}
                       size={'medium'}
                       labelStyle={styles.inputLabelPrimary}
                       style={[{borderColor: appColors.primary, flex: 1}, this.props.style]}
                       status={this.props.messageError === null ? '' : 'danger'}
                       caption={this.props.messageError === null ? '' : this.props.messageError}
                       keyboardType={this.props.type ? this.props.type : 'default'}
                       captionStyle={{fontWeight: 'bold'}}
                       onChangeText={text => this._textChange(text)}/>
            )
        }
    }
    _textChange(fieldIdentifier, text) {
        this.props.onTextChange(text);
    }

}