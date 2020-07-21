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
export default class SimulatorRentForm extends Component {
    fiscalTypeService;
    constructor(props) {
        super(props);
        this.fiscalTypeService = new FiscalTypeService();
        this.state = {
            fiscalTypeId: this.props.recoverredFormValues.fiscalTypeId ? this.props.recoverredFormValues.fiscalTypeId : 1,
            monthlyRent: this.props.recoverredFormValues.monthlyRent ? this.props.recoverredFormValues.monthlyRent : null,

            fiscalTypes: null,
            selectedFiscalType: null
        }
    }


    componentDidMount(): void {
        this.fiscalTypeService.getFiscalTypes().then(async (types) => {
            const defaultType = types.find((t) => t.name === MICRO_FONCIER);
            this.setState({
                fiscalTypes: types,
                selectedFiscalType: defaultType
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <SectionDivider sectionName={'La location'}/>
                    { this.state.fiscalTypes && this.state.fiscalTypes !== null  && this.state.fiscalTypes.length > 0 &&
                    <View style={styles.flexRowAlignCenter}>
                        <Select
                            style={{flex: 1}}
                            label={evaProps => <Text {...evaProps} style={styles.inputLabelPrimary}>Choisir un régime fiscal</Text>}
                            value={evaProps => <Text {...evaProps} >{this.state.selectedFiscalType ? this.state.selectedFiscalType.name : ''}</Text>}
                            onSelect={(index) => this.selectFiscalType(index.row)}>
                            {this.state.fiscalTypes.map((type) => {
                                return (<SelectItem key={type.id} title={evaProps => <Text {...evaProps} >{type.name}</Text>}/>)
                            })}
                        </Select>
                        {this.state.selectedFiscalType && <TooltipsHelper showAsAlert={true}  messageInfo={this.state.selectedFiscalType.description}/>}
                    </View>}
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={<Text style={styles.inputLabelPrimary}>Loyer mensuel hors charges (€) <Text style={styles.formStarRequired}>*</Text></Text>}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.monthlyRent}
                                    onTextChange={(text) => this.setState({monthlyRent: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'S\'il y a plusieurs biens (cas d\'un immeuble par exemple), additionner tous les loyers HC'}/>
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
        const messageError = this._checkFormValues();
        if (messageError === '') {
            this.props.formValuesReturned(this.state);
        } else {
            showInfoAlert(messageError, true)
        }
    }

    /**
     * Change the fiscal type
     * @param row is the index in the select which will be use to recover in the array of types
     */
    selectFiscalType(row) {
        const type = this.state.fiscalTypes[row];
        this.setState({
            selectedFiscalType: type,
            fiscalTypeId: type.id
        });
    }


    /**
     * Check the required field filled or not
     * @returns {string} the message error with the field required
     * @private
     */
    _checkFormValues() {
        let messageError = '';
        if (!this.state.monthlyRent) {
            messageError = messageError + '- Loyer requis \n';
        }
        return messageError;
    }
}