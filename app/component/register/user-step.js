import React, {Component} from "react";
import {
    View
} from "react-native";
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import InputField from '../subcomponent/form/input-field';
import { Text, Layout} from '@ui-kitten/components';
import SectionDivider from '../../component/subcomponent/form/section-divider';

/**
 * PROPS :
 * - stepIsdone: boolean to indicate if step need to emit the values
 * - stepValue: function to emit the values for register
 * - hasError: function call to emit if forms has errors occured
 */
export default class UserRegisterStep extends Component {
    _mailError: false;
    _loginError: false;
    constructor(props) {
        super(props);
        this.state = {
            mail: null,
            password: null,
            confirmPassword: null,
            login: null,
            areEqual: true,
            _passwordError: null,
            confirmIsValid: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stepIsdone !== this.props.stepIsdone && this.props.stepIsdone) {
            const user = {
                mail: this.state.mail,
                login: this.state.login,
                password: this.state.password
            };
            this.checkFieldsValidity(user);
        }
    }
    checkFieldsValidity(user) {
        if (this._mailError || this._loginError || this.state._passwordError || !this.state.confirmIsValid || !this.state.areEqual) {
            this.props.hasError(true);
        } else {
            this.props.hasError(false);
            this.props.stepValue(user)
        }
    }
    render() {
        return (
            <Layout style={[{flex: 1, padding: 15, backgroundColor: appColors.white}]}>
                <SectionDivider sectionName={'Information du compte'}/>
                <Text style={{textAlign: 'center', margin: deviceWidth/25}}>Tous les champs marqués d'une étoile ( * ) sont obligatoires pour pouvoir vous connecter</Text>
                <InputField style={{marginBottom: deviceHeigth/8}} label={'Votre adresse email *'}
                            type={'email-address'}
                            fieldName={'mail'}
                            value={this.state.mail}
                            errorOnField={(isOnError) => this._mailError = isOnError}
                            validationRegex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/}
                            messageErrors={[['required', 'L\'email est requis'], ['pattern', 'L\'email n\'est pas valide']]}
                            formSubmitted={this.props.stepIsdone}
                            onTextChange={(text) => this.setState({mail: text})}/>
                <InputField style={{marginBottom: deviceHeigth/8}} label={'Choississez un identifiant de connexion *'}
                            value={this.state.login}
                            fieldName={'login'}
                            formSubmitted={this.props.stepIsdone}
                            messageErrors={[['required', 'Un identifiant de connexion est requis']]}
                            errorOnField={(isOnError) => this._loginError = isOnError}
                            onTextChange={(text) => this.setState({login: text})}/>
                <InputField style={{marginBottom: deviceHeigth/7}} label={'Votre mot de passe *'}
                            value={this.state.password}
                            fieldName={'password'}
                            formSubmitted={this.props.stepIsdone}
                            errorOnField={(isOnError) => this.setState({_passwordError: isOnError})}
                            onTextChange={(text) => this._checkPassEquality(text, false)}
                            type={'password'}
                            messageErrors={[['required', 'Vous devez entrer un mot de passe'], ['pattern', 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et au moins 8 charactères']]}
                            validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}/>
                <InputField style={{marginBottom: deviceHeigth/8}} label={'Confirmer le mot de passe *'}
                            value={this.state.confirmPassword}
                            fieldName={'confirmPassword'}
                            formSubmitted={this.props.stepIsdone}
                            onTextChange={(text) => this._checkPassEquality(text, true)}
                            type={'password'}
                            disabled={this.state.password === '' || !this.state.password}
                            errorOnField={(isOnError) => this.setState({confirmIsValid: !isOnError})}
                            messageErrors={[['required', 'Il faut confirmer votre mot de passe']]}
                            validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}/>
                {!this.state.areEqual && <Text style={[styles.errorFormLabel, {fontSize: 12}]}>Les mots de passe ne correspondent pas</Text>}
            </Layout>
        )
    }

    async _checkPassEquality(text, isConfirmCase) {
        let areEqual;
        if(isConfirmCase) {
            areEqual = (text === this.state.password);
            this.setState({confirmPassword: text, areEqual: areEqual});
        } else {
            areEqual = (text === this.state.confirmPassword);
            this.setState({password: text, areEqual: areEqual});
        }
    }
};
