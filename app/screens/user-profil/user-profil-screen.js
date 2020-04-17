import React, { Component } from 'react';
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Avatar, Button, Datepicker} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SectionDivider from '../../component/subcomponent/form/section-divider';
import InputField from '../../component/subcomponent/form/input-field';
import {CalendarIcon} from "../../component/subcomponent/basic-icons";
import {FIRST_NAME, LAST_NAME} from '../../shared/util/constants'
export default class UserProfilScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
    }
    componentWillUnmount() {
        // todo: launch save data if change occured
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
                                    onTextChange={(text) => this._fieldValueChange(FIRST_NAME, text)}/>
                        <InputField label={'Nom'}
                                    onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    </View>
                    <Datepicker
                        label="Date de naissance"
                        size={'medium'}
                        labelStyle={styles.inputLabelPrimary}
                        style={{borderColor: appColors.primary, width: deviceWidth/2}}
                        date={new Date(1998,2,11)}
                        max={new Date()}
                        min={new Date(1930,1,1)}
                        icon={CalendarIcon}
                        onSelect={(date) => this._fieldValueChange(BIRTH, date)}
                    />
                    <SectionDivider sectionName={'Coordonnées'}/>
                    <InputField label={'Mail'}
                                type={'email-address'}
                                onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    <InputField label={'Téléphone'}
                                type={'numeric'}
                                style={{width: deviceWidth/2}}
                                onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    <SectionDivider sectionName={'Identifiants'}/>
                    <InputField label={'Login'}
                                onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    <InputField label={'Mot de passe'}
                                type={'password'}
                                style={{width: deviceWidth/2}}
                                onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    <InputField label={'Nouveau mot de passe'}
                                type={'password'}
                                style={{width: deviceWidth/2}}
                                onTextChange={(text) => this._fieldValueChange(LAST_NAME, text)}/>
                    <SectionDivider sectionName={'Profil investisseur'}/>
                    <Button style={{backgroundColor: appColors.primary, borderColor: appColors.primary, marginBottom: deviceHeigth/20, marginTop: 15}}>Editer mon profil investisseur</Button>
                </ScrollView>
            </SafeAreaView>
        );
    }

    _fieldValueChange(fieldChanged, text) {
        switch (fieldChanged) {
            case FIRST_NAME: break;
            case LAST_NAME: break;
            case BIRTH: break;
            case MAIL: break;
            case PHONE: break;
            case LOGIN: break;
            case OLD_PASS: break;
            case NEW_PASS: break;
        }
    }
}