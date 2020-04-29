import React, {Component} from "react";
import {
    View
} from "react-native";
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import InputField from '../subcomponent/form/input-field';
import {BIRTH} from "../../shared/util/constants";
import {CalendarIcon} from "../subcomponent/basic-icons";
import { Text, Datepicker} from '@ui-kitten/components';
import SectionDivider from '../../component/subcomponent/form/section-divider';

/**
 * PROPS :
 * - stepIsdone: boolean to indicate if step need to emit the values
 * - stepValue: function to emit the values for register
 */
export default class UserInfoRegisterStep extends Component {
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
            console.log('====LUNCH')
            this.props.stepValue(data)
        }
    }
    render() {
        return (
            <View style={{flex: 1, padding: 15, backgroundColor: appColors.white}}>
                <SectionDivider sectionName={'Information personnelles'}/>
                <Text category={'h4'}>Toutes ses informations sont facultatives et pourront être renseignées plus tard si vous le souhaitez</Text>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Votre numéro de téléphone'}
                            type={'numeric'}
                            value={this.state.phone}
                            messageErrors={[['pattern', 'Le numéro de téléphone n\'est pas valide, rentrer les 10 chiffres']]}
                            validationRegex={/^[0-9]{10}$/}
                            onTextChange={(text) => this.setState({phone: text})}/>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Votre nom'}
                            value={this.state.lastName}
                            onTextChange={(text) => this.setState({lastName: text})}/>
                <InputField style={{marginBottom: deviceHeigth/10}} label={'Votre prénom'}
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
            </View>
        )
    }
}