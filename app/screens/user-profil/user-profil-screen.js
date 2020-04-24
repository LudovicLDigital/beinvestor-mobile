import React, { Component } from 'react';
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Icon, Avatar, Button, Datepicker} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SectionDivider from '../../component/subcomponent/form/section-divider';
import InputField from '../../component/subcomponent/form/input-field';
import {CalendarIcon} from "../../component/subcomponent/basic-icons";
import {
    BIRTH,
    FIRST_NAME,
    LAST_NAME,
    MAIL,
    NEW_PASS,
    OLD_PASS,
    PHONE,
    REFRESH_TOKEN_KEY
} from '../../shared/util/constants'
import AuthService from '../../shared/services/auth';
import {showInfoAlert, showToast} from "../../shared/util/ui-helpers";
import UsersService from "../../shared/services/entities/users-service";
import Loader from "../../component/subcomponent/loader";
import DeviceStorage from "../../shared/util/device-storage";
import ProfilPicturePicker from "../../component/subcomponent/form/profil-picture-picker";
const requiredMessage = ' est un champs requis';
const SaveIcon = (style) => (
    <Icon {...style} fill={appColors.white}  name='save' />
);
export default class UserProfilScreen extends Component {
    _currentUser;
    _userService;
    _arrayOfFieldOnError: [];
    _newPasswordIsValid: false;
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            birth: null,
            mail: null,
            phone: null,
            login: null,
            password: null,
            newPassword: null,
            dataHaveChange: false,
            oldPasswordError: null,
            waitingForChange: false,
            marginBottomDivider: 20,
            passwordChangeViewHeight: null
        };
        this._userService = new UsersService();
        this._arrayOfFieldOnError = [];
    }
    _setUserStatesDatas( user) {
        this.setState({
            firstName: user.userInfo.firstName,
            lastName: user.userInfo.lastName,
            birth: new Date(user.userInfo.birthDate),
            mail: user.user.mail,
            phone: user.user.phone,
            login: user.user.login,
        })
    }

    componentDidMount(): void {
        this._recoverCurrentUserData();
    }
    _recoverCurrentUserData() {
        AuthService.getCurrentUser().then((user) => {
            this._currentUser = user;
            this._setUserStatesDatas(user);
        }).catch((error) => {
            showToast('Impossible de récupérer l\'utilisateur courant');
            console.error(error);
        });
    }
    _updateUserInfo() {
        if(this._compareUserAndDatasChanged()) {
            if (this._arrayOfFieldOnError.length <= 0) {
                const updatedData = this._setUpdateData();
                this._userService.updateCurrentUser(updatedData).then((userWithUpdate) => {
                    this._currentUser = userWithUpdate;
                    AuthService.currentUserHaveBeenUpdate(this._currentUser);
                    this.setState({
                        dataHaveChange: false
                    });
                }).catch((error) => {
                    showToast('Problème lors de la mise à jours de vos données');
                    console.log(error);
                })
            } else {
                showInfoAlert('Un ou plusieurs champs sont invalides')
            }
        }
    }
    _compareUserAndDatasChanged() {
        const previousUserBirth = new Date(this._currentUser.userInfo.birthDate);
        const stateBirth = new Date(this.state.birth);
        if (this.state.firstName !== this._currentUser.userInfo.firstName) {
            return true;
        }
        if (this.state.lastName !== this._currentUser.userInfo.lastName) {
            return true;
        }
        if (this.state.mail !== this._currentUser.user.mail) {
            return true;
        }
        if (this.state.phone !== this._currentUser.user.phone) {
            return true;
        }
        if (this.state.login !== this._currentUser.user.login) {
            return true;
        }
        if (stateBirth.getDate() !== previousUserBirth.getDate() || stateBirth.getFullYear() !== previousUserBirth.getFullYear() || stateBirth.getMonth() !== previousUserBirth.getMonth()) {
            return true;
        }
        return false;
    }
    _setUpdateData() {
        const updatedUser = {
            id: this._currentUser.user.id,
            login: this.state.login,
            mail: this.state.mail,
            phone: this.state.phone,
            userInfo: {
                id: this._currentUser.userInfo.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDate: this.state.birth,
                userId: this._currentUser.userInfo.userId
            }
        };
        return updatedUser;
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} navigation={this.props.navigation}/>
                { this.state.dataHaveChange &&
                    <Button
                        style={[styles.absoluteBottom, {
                            zIndex: 1000,
                            backgroundColor: appColors.success,
                            borderColor: appColors.success
                        }]}
                        size={'medium'}
                        onPress={() => this._updateUserInfo()}
                        icon={SaveIcon}>
                        Sauvegarder
                    </Button>
                }
                <ScrollView style={[{ flex:1},styles.fullScreen]}>
                    <ProfilPicturePicker isAbleToEdit={true}/>
                    <View style={{flexDirection: 'row'}}>
                        <InputField label={'Prénom'}
                                    style={{marginRight: 10}}
                                    value={this.state.firstName}
                                    onTextChange={(text) => this._fieldValueChange(FIRST_NAME, text)}/>
                        <InputField label={'Nom'}
                                    value={this.state.lastName}
                                    onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    </View>
                    <Datepicker
                        label="Date de naissance"
                        size={'medium'}
                        labelStyle={styles.inputLabelPrimary}
                        style={{borderColor: appColors.primary, width: deviceWidth/2}}
                        date={this.state.birth}
                        max={new Date()}
                        min={new Date(1930,1,1)}
                        icon={CalendarIcon}
                        onSelect={(date) => this._fieldValueChange(BIRTH, date)}
                    />
                    <SectionDivider sectionName={'Coordonnées'}/>
                    <InputField label={'Mail'}
                                type={'email-address'}
                                value={this.state.mail}
                                validationRegex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/}
                                messageErrors={[['required', 'L\'email'+requiredMessage], ['pattern', 'L\'email n\'est pas valide']]}
                                errorOnField={(isOnError) => this.errorOnField(MAIL, isOnError)}
                                onTextChange={(text) => this._fieldValueChange(MAIL, text)}/>
                    <InputField label={'Téléphone'}
                                type={'numeric'}
                                style={{width: deviceWidth/2}}
                                messageErrors={[['pattern', 'Le numéro de téléphone n\'est pas valide, rentrer les 10 chiffres']]}
                                validationRegex={/^[0-9]{10}$/}
                                value={this.state.phone}
                                errorOnField={(isOnError) => this.errorOnField(PHONE, isOnError)}
                                onTextChange={(text) => this._fieldValueChange(PHONE, text)}/>
                    <SectionDivider sectionName={'Identifiants'}/>
                    <InputField label={'Login'}
                                disabled={true}
                                value={this.state.login}/>
                    <View style={{flex: 1, flexDirection: 'row'}} onLayout={(event) => { this.setEndViewForLoader(event.nativeEvent.layout) }}>
                        <Loader loadTitle={'Changement du mot de passe...'} parentHeight={this.state.passwordChangeViewHeight} isDisplayed={this.state.waitingForChange}/>
                        <View style={{flex: 3}}>
                            <InputField label={'Mot de passe'}
                                        type={'password'}
                                        value={this.state.password}
                                        style={{width: deviceWidth/2}}
                                        messageErrors={[['invalid', 'Mot de passe incorrect']]}
                                        receivedErrorByForm={this.state.oldPasswordError}
                                        onTextChange={(text) => this._fieldValueChange(OLD_PASS, text)}/>
                            <InputField label={'Nouveau mot de passe'}
                                        type={'password'}
                                        disabled={this.state.password === '' || !this.state.password}
                                        errorOnField={(isOnError) => this._newPasswordIsValid = !isOnError}
                                        messageErrors={[['required', 'Le nouveau mot de passe' + requiredMessage], ['pattern', 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et au moins 8 charactères']]}
                                        style={{width: deviceWidth/2, marginRight: 10}}
                                        value={this.state.newPassword}
                                        validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}
                                        onTextChange={(text) => this._fieldValueChange(NEW_PASS, text)}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Button size={'small'}
                                    onPress={() => this._tryChangePassword()}
                                    disabled={this.state.newPassword === '' || !this.state.newPassword}
                                    style={{
                                        backgroundColor: (this.state.newPassword === '' || !this.state.newPassword) ? appColors.primaryLight : appColors.success,
                                        borderColor: (this.state.newPassword === '' || !this.state.newPassword) ? appColors.primaryLight : appColors.success,
                                        color: appColors.white
                                    }}>
                                Changer
                            </Button>
                        </View>
                    </View>
                    <SectionDivider sectionName={'Profil investisseur'}/>
                    <Button style={{backgroundColor: appColors.primary, borderColor: appColors.primary, marginBottom: deviceHeigth/this.state.marginBottomDivider, marginTop: 15}}>
                        Editer mon profil investisseur
                    </Button>
                </ScrollView>
            </SafeAreaView>
        );
    }

    errorOnField(fieldIdentifier, isOnError) {
        const index = this._arrayOfFieldOnError.indexOf(fieldIdentifier);
        if (index === -1 && isOnError) {
            this._arrayOfFieldOnError.push(fieldIdentifier);
        } else if (!isOnError && index !== -1) {
            this._arrayOfFieldOnError.splice(index, 1);
        }
    }

    async _fieldValueChange(fieldChanged, value) {
        switch (fieldChanged) {
            case FIRST_NAME:
                await this.setState({firstName: value});
                break;
            case LAST_NAME:
                await this.setState({lastName: value});
                break;
            case BIRTH:
                await this.setState({birth: value});
                break;
            case MAIL:
                await this.setState({mail: value});
                break;
            case PHONE:
                await this.setState({phone: value});
                break;
            case OLD_PASS:
                await this.setState({password: value});
                break;
            case NEW_PASS:
                await this.setState({newPassword: value});
                break;
        }
        this._displayOrNotSave();
    }
    _displayOrNotSave() {
        const changed = this._compareUserAndDatasChanged();
        this.setState({
            dataHaveChange: changed,
            marginBottomDivider: changed ? 7 : 20
        });
    }

    _tryChangePassword() {
        if (this._newPasswordIsValid) {
            this.setState({waitingForChange: true});
            this._userService.changePassword(this.state.password, this.state.newPassword).then((newTokens) => {
                if (newTokens) {
                    DeviceStorage.setCurrentUserToken(newTokens.accessToken).then(() => {
                        DeviceStorage.storeNewKeyValue(REFRESH_TOKEN_KEY, newTokens.refreshToken);
                        this.setState({
                            password: '',
                            newPassword: '',
                            oldPasswordError: null,
                            waitingForChange: false
                        });
                        showToast('Mot de passe changé');
                    }).catch((error) => {
                        this.setState({
                            waitingForChange: false
                        });
                        showToast('Une erreur est survenue');
                        console.error(error);
                    });
                } else {
                    this.setState({
                        oldPasswordError: 'invalid',
                        waitingForChange: false
                    });
                    showToast('Mot de passe incorrect');
                }
            }).catch((error) => {
                this.setState({
                    waitingForChange: false
                });
                console.log(error)
            });
        }
    }

    setEndViewForLoader(layout) {
        const {height} = layout;
        this.setState({
            passwordChangeViewHeight: height
        })
    }
}