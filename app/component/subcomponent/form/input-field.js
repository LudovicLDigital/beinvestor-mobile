import React, {Component} from "react";
import { Input, Icon} from '@ui-kitten/components';
import {styles, appColors} from "../../../shared/styles/global";

/**
 * PROPS :
 * - fieldName : an identifier for the field (used principally for debug)
 * - label : label of the field
 * - value : the value of the field
 * - messageErrors : message errors Map of the field, can contain key : 'required', 'pattern'; the value will be the associated message
 * - receivedErrorByForm: a string with the error to display ('required', 'pattern', 'invalid') or false / null / undefined if none
 * - data : the data string to display in the field
 * - type : the type of input 'password', 'password-show', 'numeric', 'email-address'
 * - onTextChange: call back when text change
 * - validationRegex : the regex we want to
 * - disabled: if the input must be disable
 * - errorOnField: throwed when field is in error case return a boolean
 * - formSubmitted: a boolean to check errors case for value when form is submitted
 */
export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: true,
            messageError: null,
            showPassType: this.props.type,
            receivedErrorByForm: this.props.receivedErrorByForm,
            mapErrors: new Map(this.props.messageErrors)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.receivedErrorByForm !== prevProps.receivedErrorByForm) {
            this.setState({receivedErrorByForm: this.props.receivedErrorByForm});
        }
        if (prevProps.formSubmitted !== this.props.formSubmitted && this.props.formSubmitted) {
            this._checkErrorsForText(this.props.value);
        }
    }
    render() {
        const onIconPress = () => {
            this.setState({showPassType: this.state.showPassType === 'password' ? 'text' : 'password'});
        };
        if (this.props.type === 'password' || this.props.type === 'password-show') {
            return (
                    <Input label={this.props.label}
                           size={'small'}
                           value={this.props.value}
                           disabled={this.props.disabled}
                           labelStyle={styles.inputLabelPrimary}
                           style={[{borderColor: appColors.primary, flex: 1}, this.props.style]}
                           status={(this.state.isValidated && (!this.state.receivedErrorByForm || this.state.receivedErrorByForm === null)) ? '' : 'danger'}
                           secureTextEntry={this.state.showPassType === 'password'}
                           caption={(this.state.isValidated && (!this.state.receivedErrorByForm || this.state.receivedErrorByForm === null)) ? '' : this._messageErrorToDisplay()}
                           onIconPress={onIconPress}
                           icon={(style) => {
                               const eyeOff = this.state.showPassType === 'password';
                               return (<Icon {...style} fill={appColors.primary} name={eyeOff ? 'eye-off' : 'eye'}/>)
                           }}
                           captionStyle={{fontWeight: 'bold', marginTop: 20}}
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
                           status={(this.state.isValidated && (!this.state.receivedErrorByForm || this.state.receivedErrorByForm === null)) ? '' : 'danger'}
                           caption={(this.state.isValidated && (!this.state.receivedErrorByForm || this.state.receivedErrorByForm === null)) ? '' : this._messageErrorToDisplay()}
                           keyboardType={this.props.type ? this.props.type : 'default'}
                           captionStyle={{fontWeight: 'bold', marginTop: 20}}
                           onChangeText={text => this._textChange(text)}/>
            )
        }
    }
    _textChange(text) {
        this.props.onTextChange(text);
        this._checkErrorsForText(text);
    }
    _checkErrorsForText(text) {
        if (this.props.messageErrors && this.state.mapErrors.get('required') && (!text || text.trim() === '')) {
            this._setErrorCase('required');
        } else if (this.props.messageErrors && this.props.validationRegex && !this.props.validationRegex.test(text)) {
            this._setErrorCase('pattern');
        } else if (this.state.receivedErrorByForm && this.state.receivedErrorByForm !== null) {
            this._setErrorCase(this.state.receivedErrorByForm);
        } else {
            this.setState({
                isValidated: true,
                messageError: ''
            });
            if (this.props.errorOnField) {
                this.props.errorOnField(false)
            }
        }
    }
    _setErrorCase(caseError) {
        this.setState({
            isValidated: false,
            messageError:  this.state.mapErrors.get(caseError)
        });
        if (this.props.errorOnField) {
            this.props.errorOnField(true)
        }
    }
    _messageErrorToDisplay() {
        let messageError;
        if (this.state.receivedErrorByForm &&
            (this.state.receivedErrorByForm === 'required' ||
                this.state.receivedErrorByForm === 'pattern' ||
                this.state.receivedErrorByForm === 'invalid' )) {
            messageError = this.state.mapErrors.get(this.state.receivedErrorByForm);
            if(messageError !== this.state.messageError) {
                this.setState({messageError: messageError});
            }
        }
        return this.state.messageError;
    }
}