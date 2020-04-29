import React, {Component} from "react";
import {
    View
} from "react-native";
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import InputField from '../subcomponent/form/input-field';
import { Text} from '@ui-kitten/components';
import SectionDivider from '../../component/subcomponent/form/section-divider';

/**
 * PROPS :
 * - stepIsdone: boolean to indicate if step need to emit the values
 * - stepValue: function to emit the values for register
 */
export default class UserRegisterStep extends Component {
    _confirmIsValid;
    constructor(props) {
        super(props);
        this.state = {
            mail: 'test@mail.com',
            password: 'Test1234',
            confirmPassword: null,
            login: "test",
            areEqual: true
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.stepIsdone) {
            const user = {
                mail: this.state.mail,
                login: this.state.login,
                password: this.state.password
            };
            this.props.stepValue(user)
        }
    }
    render() {
        return (
            <View style={[{flex: 1, padding: 15, backgroundColor: appColors.white}]}>
                <SectionDivider sectionName={'Information du compte'}/>
                <Text category={'h4'}>Tous les champs marqués d'une étoile ( * ) sont obligatoire pour pouvoir vous connecter</Text>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Votre adresse email *'}
                            type={'email-address'}
                            value={this.state.mail}
                            validationRegex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/}
                            messageErrors={[['required', 'L\'email est requis'], ['pattern', 'L\'email n\'est pas valide']]}
                            onTextChange={(text) => this.setState({mail: text})}/>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Choississez un identifiant de connexion *'}
                            value={this.state.login}
                            onTextChange={(text) => this.setState({login: text})}/>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Votre mot de passe *'}
                            value={this.state.password}
                            onTextChange={(text) => this._checkPassEquality(text, false)}
                            type={'password'}
                            messageErrors={[['required', 'Vous devez entrer un mot de passe'], ['pattern', 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et au moins 8 charactères']]}
                            validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}/>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Confirmer le mot de passe *'}
                            value={this.state.confirmPassword}
                            onTextChange={(text) => this._checkPassEquality(text, true)}
                            type={'password'}
                            disabled={this.state.password === '' || !this.state.password}
                            errorOnField={(isOnError) => this._confirmIsValid = !isOnError}
                            receivedErrorByForm={this.state.areEqual ? null : 'isNotEqual'}
                            messageErrors={[['required', 'Il faut confirmer votre mot de passe'], ['isNotEqual', 'Les mots de passe ne correspondent pas']]}
                            validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}/>
            </View>
        )
    }

    async _checkPassEquality(text, isConfirmCase) {
        if(isConfirmCase) {
            await this.setState({confirmPassword: text});
        } else {
           await this.setState({password: text});
        }
        if (this.state.password === this.state.confirmPassword) {
            this.setState({areEqual: true});
        } else {
            this.setState({areEqual: false});
        }
    }
};
