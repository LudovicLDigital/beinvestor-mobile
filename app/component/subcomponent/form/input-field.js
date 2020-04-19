import React, {Component} from "react";
import { Input, Icon} from '@ui-kitten/components';
import {styles, appColors} from "../../../shared/styles/global";

/**
 * PROPS :
 * - label : label of the field
 * - value : the value of the field
 * - messageErrors : message errors Map of the field, can contain key : 'required', 'pattern'; the value will be the associated message
 * - receivedErrorByForm: a string with the error to display ('required', 'pattern')
 * - data : the data string to display in the field
 * - type : the type of input 'password', 'password-show', 'numeric', 'email-address'
 * - onTextChange: call back when text change
 * - validationRegex : the regex we want to
 * - disabled: if the input must be disable
 */
export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: true,
            messageError: null,
            mapErrors: new Map(this.props.messageErrors)
        }
    }

    render() {
        if (this.props.type === 'password' || this.props.type === 'password-show') {
            return (
                <Input label={this.props.label}
                       size={'small'}
                       value={this.props.value}
                       disabled={this.props.disabled}
                       labelStyle={styles.inputLabelPrimary}
                       style={[{borderColor: appColors.primary, flex: 1}, this.props.style]}
                       status={(this.state.isValidated && !this.props.receivedErrorByForm) ? '' : 'danger'}
                       secureTextEntry={this.props.type === 'password'}
                       caption={(this.state.isValidated && !this.props.receivedErrorByForm) ? '' : this._messageErrorToDisplay()}
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
                       size={'small'}
                       value={this.props.value}
                       disabled={this.props.disabled}
                       labelStyle={styles.inputLabelPrimary}
                       style={[{borderColor: appColors.primary, flex: 1}, this.props.style]}
                       status={(this.state.isValidated && !this.props.receivedErrorByForm) ? '' : 'danger'}
                       caption={(this.state.isValidated && !this.props.receivedErrorByForm) ? '' : this._messageErrorToDisplay()}
                       keyboardType={this.props.type ? this.props.type : 'default'}
                       captionStyle={{fontWeight: 'bold'}}
                       onChangeText={text => this._textChange(text)}/>
            )
        }
    }
    _textChange(text) {
        this.props.onTextChange(text);
        if (this.props.messageErrors && this.state.mapErrors.get('required') && text.trim() === '') {
            this.setState({
                isValidated: false,
                messageError:  this.state.mapErrors.get('required')
            });
        } else if (this.props.messageErrors && this.props.validationRegex && !this.props.validationRegex.test(text)) {
            this.setState({
                isValidated: false,
                messageError: this.state.mapErrors.get('pattern')
            });
        } else {
            this.setState({
                isValidated: true,
                messageError: ''
            });
        }
    }
    _messageErrorToDisplay() {
        let messageError;
        if (this.props.receivedErrorByForm && (this.props.receivedErrorByForm === 'required' || this.props.receivedErrorByForm === 'pattern')) {
            messageError = this.state.mapErrors.get(this.props.receivedErrorByForm);
            this.setState({messageError: messageError});
        }
        return this.state.messageError;
    }
}