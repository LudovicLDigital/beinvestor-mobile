import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import {Select, SelectItem, Text, Toggle} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TooltipsHelper from "../subcomponent/tooltips-helper";
import InputField from "../subcomponent/form/input-field";
import FiscalTypeService from "../../shared/services/entities/fiscal-type-service";
import {MICRO_FONCIER} from "../../shared/util/constants";
import SectionDivider from "../subcomponent/form/section-divider";

/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : préinputed values for the form
 */
export default class SimulatorSituationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professionnalSalary: this.props.recoverredFormValues.professionnalSalary ? this.props.recoverredFormValues.professionnalSalary : '0',
            annualRent: this.props.recoverredFormValues.annualRent ? this.props.recoverredFormValues.annualRent : '0',
        }
    }


    componentDidMount(): void {}

    render() {
        return (
            <>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <SectionDivider sectionName={'Votre situation'}/>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Salaire professionnel annuel (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.professionnalSalary}
                                    onTextChange={(text) => this.setState({professionnalSalary: text})}/>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Autre revenus (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.annualRent}
                                    onTextChange={(text) => this.setState({annualRent: text})}/>
                    </View>
                </ScrollView>
                <Icon.Button name="save"
                             backgroundColor={appColors.success}
                             onPress={() => this.save()}
                             style={{justifyContent: 'center'}}>
                    Sauvegarder
                </Icon.Button>
            </>
        )
    }

    /**
     * Emit the new values to parent component
     */
    save() {
        this.props.formValuesReturned(this.state);
    }
}