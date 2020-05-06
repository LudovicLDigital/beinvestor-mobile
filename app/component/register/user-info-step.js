import React, {Component} from "react";
import {
    View
} from "react-native";
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import InputField from '../subcomponent/form/input-field';
import {CalendarIcon} from "../subcomponent/basic-icons";
import { Text, Datepicker, Layout} from '@ui-kitten/components';
import SectionDivider from '../../component/subcomponent/form/section-divider';

/**
 * PROPS :
 * - stepIsdone: boolean to indicate if step need to emit the values
 * - stepValue: function to emit the values for register,
 * - hasError: function call to emit if forms has errors occured
 */
export default class UserInfoRegisterStep extends Component {
    _phoneError: false;
    constructor(props) {
        super(props);
        this.state = {
            birthDate: null,
            lastName: null,
            firstName: null,
            phone: null,
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.stepIsdone !== this.props.stepIsdone && this.props.stepIsdone) {
            const data = {
                birthDate: this.state.birthDate,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                phone: this.state.phone
            };
            this.checkFieldsValidity(data);
        }
    }

    checkFieldsValidity(data) {
        if (this._phoneError) {
            this.props.hasError(true);
        } else {
            this.props.hasError(false);
            this.props.stepValue(data)
        }
    }
    render() {
        return (
            <Layout style={{flex: 1, padding: 15, backgroundColor: appColors.white}}>
                <SectionDivider sectionName={'Information personnelles'}/>
                <Text  style={{textAlign: 'center', margin: deviceWidth/25}}>Toutes ces informations sont facultatives et pourront être renseignées plus tard si vous le souhaitez</Text>
                <InputField style={{marginBottom: deviceHeigth/7}} label={'Votre numéro de téléphone'}
                            type={'numeric'}
                            value={this.state.phone}
                            messageErrors={[['pattern', 'Le numéro de téléphone n\'est pas valide, rentrer les 10 chiffres']]}
                            validationRegex={/^[0-9]{10}$/}
                            onTextChange={(text) => this.setState({phone: text})}/>
                <InputField style={{marginBottom: deviceHeigth/8}} label={'Votre nom'}
                            value={this.state.lastName}
                            onTextChange={(text) => this.setState({lastName: text})}/>
                <InputField style={{marginBottom: deviceHeigth/8}} label={'Votre prénom'}
                            value={this.state.firstName}
                            onTextChange={(text) => this.setState({firstName: text})}/>
                <Datepicker
                    label="Date de naissance"
                    size={'medium'}
                    labelStyle={styles.inputLabelPrimary}
                    style={{borderColor: appColors.primary}}
                    date={this.state.birthDate}
                    max={new Date()}
                    min={new Date(1930,1,1)}
                    icon={CalendarIcon}
                    onSelect={(date) => this.setState({birthDate: date})}
                />
            </Layout>
        )
    }
}