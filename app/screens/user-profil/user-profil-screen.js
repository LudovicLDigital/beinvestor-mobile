import React, { Component } from 'react';
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Avatar, Button, Datepicker} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SectionDivider from '../../component/subcomponent/form/section-divider';
import InputField from '../../component/subcomponent/form/input-field';
import {CalendarIcon} from "../../component/subcomponent/basic-icons";
import {BIRTH, FIRST_NAME, LAST_NAME, LOGIN, MAIL, NEW_PASS, OLD_PASS, PHONE} from '../../shared/util/constants'
import AuthService from '../../shared/services/auth';
import {showToast} from "../../shared/util/ui-helpers";
import UsersService from "../../shared/services/entities/users-service";
const requiredMessage = ' est un champs requis';
export default class UserProfilScreen extends Component {
    _currentUser;
    _userService;
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
        };
        this._userService = new UsersService();
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
        this._prepareListenerForNavigation(this.props.navigation);
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
    _prepareListenerForNavigation(navigation) {
        navigation.addListener('blur', () => this._quitProfilPage()); // CALL WHEN NAVIGATE TO ANOTHER PAGE
    }
    _quitProfilPage() {
        if(this._compareUserAndDatasChanged()) {
            const updatedData = this._setUpdateData();
            this._userService.updateCurrentUser(updatedData).then((userWithUpdate) => {
                this._currentUser = userWithUpdate;
                AuthService.currentUserHaveBeenUpdate(this._currentUser);
                console.log('+++++++current AFTER UPDATE+++++++')
                console.log(this._currentUser)
            }).catch((error) => {
                showToast('Problème lors de la mise à jours de vos données');
                console.log(error);
            })
        }
    }
    _compareUserAndDatasChanged() {
        if (this.state.firstName !== this._currentUser.userInfo.firstName) return true;
        if (this.state.lastName !== this._currentUser.userInfo.lastName) return true;
        if (this.state.birth !== this._currentUser.userInfo.birthDate) return true;
        if (this.state.mail !== this._currentUser.user.mail) return true;
        if (this.state.phone !== this._currentUser.user.phone) return true;
        if (this.state.login !== this._currentUser.user.login) return true;
        return false;
    }
    _setUpdateData() {
        const updatedUser = {
            id: this._currentUser.user.id,
            login: this.state.login,
            // password: this._currentUser.user.password,
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
                <ScrollView style={[{ flex:1},styles.fullScreen]}>
                    <Avatar style={{borderWidth: 2, borderColor: appColors.secondary, alignSelf: 'center'}} size={'giant'} source={require('../../assets/icon.png')}/>
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
                                onTextChange={(text) => this._fieldValueChange(MAIL, text)}/>
                    <InputField label={'Téléphone'}
                                type={'numeric'}
                                style={{width: deviceWidth/2}}
                                messageErrors={[['pattern', 'Le numéro de téléphone n\'est pas valide, rentrer les 10 chiffres']]}
                                validationRegex={/^[0-9]{10}$/}
                                value={this.state.phone}
                                onTextChange={(text) => this._fieldValueChange(PHONE, text)}/>
                    <SectionDivider sectionName={'Identifiants'}/>
                    <InputField label={'Login'}
                                disabled={true}
                                value={this.state.login}/>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 3}}>
                            <InputField label={'Mot de passe'}
                                        type={'password'}
                                        value={this.state.password}
                                        style={{width: deviceWidth/2}}
                                        onTextChange={(text) => this._fieldValueChange(OLD_PASS, text)}/>
                            <InputField label={'Nouveau mot de passe'}
                                        type={'password'}
                                        disabled={this.state.password === '' || !this.state.password}
                                        messageErrors={[['required', 'Le nouveau mot de passe'+requiredMessage], ['pattern', 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et au moins 8 charactères']]}
                                        style={{width: deviceWidth/2, marginRight: 10}}
                                        value={this.state.newPassword}
                                        validationRegex={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-+!*$@%_\w]{8,})$/}
                                        onTextChange={(text) => this._fieldValueChange(NEW_PASS, text)}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Button size={'small'}
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
                    <Button style={{backgroundColor: appColors.primary, borderColor: appColors.primary, marginBottom: deviceHeigth/20, marginTop: 15}}>
                        Editer mon profil investisseur
                    </Button>
                </ScrollView>
            </SafeAreaView>
        );
    }

    _fieldValueChange(fieldChanged, value) {
        switch (fieldChanged) {
            case FIRST_NAME:
                this.setState({firstName: value});
                break;
            case LAST_NAME:
                this.setState({lastName: value});
                break;
            case BIRTH:
                this.setState({birth: value});
                break;
            case MAIL:
                this.setState({mail: value});
                break;
            case PHONE:
                this.setState({phone: value});
                break;
            case OLD_PASS:
                this.setState({password: value});
                break;
            case NEW_PASS:
                this.setState({newPassword: value});
                break;
        }
    }
}