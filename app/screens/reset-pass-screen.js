import React, {Component} from "react";
import {
    View,
    Linking
} from "react-native";
import {styles, appColors, deviceWidth, deviceHeigth} from "../shared/styles/global";
import { Text, Button} from '@ui-kitten/components';
import ResetService from "../shared/services/reset-pass-service";
import {SendIcon} from "../component/subcomponent/basic-icons";
import InputField from "../component/subcomponent/form/input-field";
import {showInfoAlert, showToast} from "../shared/util/ui-helpers";
import Loader from "../component/subcomponent/loader";

export default class ResetPassScreen extends Component {
    _mailError;
    constructor(props) {
        super(props);
        this.state = {
            mail: null,
            haveClickForSend: false,
            keyReset: null,
            newPassWord: null,
            confirmPassword: null,
            _passwordError: false,
            _keyError: false,
            confirmIsValid: null,
            areEqual: true,
            stepSendKey: false,
            waitingUpdate: false,
            stepResetted: false,
            loaderHeight: null
        }
    }

    componentDidMount(): void {
        if (this.props.navigation.state) {
            const { resetKey } = this.props.navigation.state.params;
            if(resetKey) {
                this.setState({keyReset: resetKey});
            }
        }
    }

    _setEndViewForLoader(layout) {
        const {height} = layout;
        this.setState({
            loaderHeight: height
        })
    }
    render() {
        return (
            <View style={[{flex: 1, backgroundColor: appColors.white}]} onLayout={(event) => { this._setEndViewForLoader(event.nativeEvent.layout) }}>
                <Loader isDisplayed={this.state.waitingUpdate} loadTitle={'Modification du mot de passe en cours...'} parentHeight={this.state.loaderHeight}/>
                {!this.state.haveClickForSend &&
                <View style={{padding: 15}}>
                    <Text style={{textAlign: 'center', margin: deviceWidth/25}}>Pour pouvoir réinitialiser votre mot de passe nous avons besoin de votre adresse email </Text>
                    <InputField label={'Votre adresse email *'}
                                type={'email-address'}
                                fieldName={'mail'}
                                value={this.state.mail}
                                style={{marginBottom: deviceHeigth/8}}
                                errorOnField={(isOnError) => this._mailError = isOnError}
                                validationRegex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/}
                                messageErrors={[['required', 'L\'email est requis'], ['pattern', 'L\'email n\'est pas valide']]}
                                formSubmitted={this.state.stepSendKey}
                                onTextChange={(text) => this.setState({mail: text})}/>
                    <Button appearance={'ghost'} textStyle={{color: appColors.primary}} icon={SendIcon} onPress={() => this.sendResetKey()}>Recevoir le code par mail</Button>
                </View>}
                {this.state.haveClickForSend &&
                <View style={{padding: 15}}>
                    <Text style={{textAlign: 'center', margin: deviceWidth/25}}>Pour finaliser la réintialisation de votre mot de passe, entrer ici le code reçu par mail puis choississez votre nouveau mot de passe </Text>
                    <InputField style={{marginBottom: deviceHeigth/8}}
                                label={'Code de reinitialisation'}
                                value={this.state.keyReset}
                                messageErrors={[['required', 'Vous devez renseigner la clé de réinitialisation']]}
                                formSubmitted={this.state.stepResetted}
                                errorOnField={(isOnError) => this.setState({_keyError: isOnError})}
                                onTextChange={(text) => this.setState({keyReset: text})}/>
                    <InputField style={{marginBottom: deviceHeigth/7}} label={'Nouveau mot de passe *'}
                                value={this.state.newPassWord}
                                fieldName={'newPassWord'}
                                formSubmitted={this.state.stepResetted}
                                errorOnField={(isOnError) => this.setState({_passwordError: isOnError})}
                                onTextChange={(text) => this._checkPassEquality(text, false)}
                                type={'password'}
                                messageErrors={[['required', 'Vous devez entrer un mot de passe'], ['pattern', 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et au moins 8 charactères']]}
                                validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}/>
                    <InputField style={{marginBottom: deviceHeigth/8}} label={'Confirmer le mot de passe *'}
                                value={this.state.confirmPassword}
                                fieldName={'confirmPassword'}
                                formSubmitted={this.state.stepResetted}
                                onTextChange={(text) => this._checkPassEquality(text, true)}
                                type={'password'}
                                disabled={this.state.newPassWord === '' || !this.state.newPassWord}
                                errorOnField={(isOnError) => this.setState({confirmIsValid: !isOnError})}
                                messageErrors={[['required', 'Il faut confirmer votre mot de passe']]}
                                validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}/>
                    {!this.state.areEqual && <Text style={[styles.errorFormLabel, {fontSize: 12}]}>Les mots de passe ne correspondent pas</Text>}
                    <Button style={styles.backgroundPrimary} onPress={() => this.resetPassword()}>Changer de mot de passe</Button>
                </View>
                }
            </View>
        )
    }
    async _checkPassEquality(text, isConfirmCase) {
        let areEqual;
        if(isConfirmCase) {
            areEqual = (text === this.state.newPassWord);
            this.setState({confirmPassword: text, areEqual: areEqual});
        } else {
            areEqual = (text === this.state.confirmPassword);
            this.setState({newPassWord: text, areEqual: areEqual});
        }
    }
    async sendResetKey() {
        await this.setState({stepSendKey: true});
        if (!this._mailError) {
            this.setState({haveClickForSend: true, stepSendKey: false});
            ResetService.sendResetKey(this.state.mail)
        } else {
            this.setState({stepSendKey: false});
            showToast('Il y a une erreur d\'email')
        }
    }

    async resetPassword() {
        await this.setState({stepResetted: true, waitingUpdate: true });
        if (!this.state._passwordError && !this.state._keyError && this.state.areEqual && !this._mailError) {
            ResetService.resetUserPassword(this.state.newPassWord, this.state.keyReset, this.state.mail).then((response) => {
                if (response === 202) {
                    this.setState({waitingUpdate: false});
                    showToast('Mot de passe changé, vous pouvez vous connecter');
                    this.props.navigation.popToTop();
                } else {
                    this.setState({waitingUpdate: false});
                    showInfoAlert(response.message);
                }
            }).catch((error) => {
                this.setState({waitingUpdate: false});
                console.error(error);
                showInfoAlert('Une erreur est survenue lors de la réinitialisation, ressayer');
            })
        }
    }
}