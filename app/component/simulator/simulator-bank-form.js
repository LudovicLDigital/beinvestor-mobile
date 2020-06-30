import React, {Component, Fragment} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import {Text, Toggle} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TooltipsHelper from "../subcomponent/tooltips-helper";
import InputField from "../subcomponent/form/input-field";
import {BANK_FOLDER_COST, BANK_GARANTY_PERCENT, TX_BANK} from "../../shared/util/constants";

/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : préinputed values for the form
 */
export default class SimulatorBankForm extends Component {
    constructor(props) {
        super(props);
        const work = this.props.recoverredFormValues.workCost ? parseFloat(this.props.recoverredFormValues.workCost) : 0;
        const buyPrice = this.props.recoverredFormValues.buyPrice ? parseFloat(this.props.recoverredFormValues.buyPrice) : 0;
        const notarialCost = this.props.recoverredFormValues.notarialCost ? parseFloat(this.props.recoverredFormValues.notarialCost) : 0;
        const determinedWarrantyCost = (BANK_GARANTY_PERCENT * (work + buyPrice + notarialCost)).toFixed(2);
        this.state = {
            makeACredit: (typeof this.props.recoverredFormValues.makeACredit !== 'undefined' && this.props.recoverredFormValues.makeACredit !== null) ? this.props.recoverredFormValues.makeACredit : true,
            is110: (typeof this.props.recoverredFormValues.is110 !== 'undefined' && this.props.recoverredFormValues.is110 !== null) ? this.props.recoverredFormValues.is110 : true,
            apport: this.props.recoverredFormValues.apport ? this.props.recoverredFormValues.apport : '0',
            creditWarrantyCost: this.props.recoverredFormValues.creditWarrantyCost ? this.props.recoverredFormValues.creditWarrantyCost : determinedWarrantyCost.toString(),
            bankCharges: this.props.recoverredFormValues.bankCharges ? this.props.recoverredFormValues.bankCharges : (BANK_FOLDER_COST).toString(),
            creditTime: this.props.recoverredFormValues.creditTime ? this.props.recoverredFormValues.creditTime : '20',
            bankRate: this.props.recoverredFormValues.bankRate ? this.props.recoverredFormValues.bankRate : TX_BANK,
            actualCreditMensualities: this.props.recoverredFormValues.actualCreditMensualities ? this.props.recoverredFormValues.actualCreditMensualities : '0',
            furnitureCost: this.props.recoverredFormValues.furnitureCost ? this.props.recoverredFormValues.furnitureCost : '0',
            includeFurnitureInCredit: (typeof this.props.recoverredFormValues.includeFurnitureInCredit !== 'undefined' && this.props.recoverredFormValues.includeFurnitureInCredit !== null) ? this.props.recoverredFormValues.includeFurnitureInCredit : false,
        }
    }

    render() {
        return (
            <Fragment>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <Text style={{fontWeight: 'bold', color: appColors.dangerDark, fontSize: 11, textAlign: 'center', marginBottom: 10}}>Les champs marqués avec une étoile " * " sont obligatoires</Text>

                    <Toggle style={{alignSelf: 'flex-start', marginBottom: 15}} checked={this.state.makeACredit} onChange={() => this.setState({makeACredit: !this.state.makeACredit})}>
                        {evaProps => <Text {...evaProps} >{this.state.makeACredit ? 'Je fais un emprunt' : 'Je ne fais pas d\'emprunt'}</Text>}
                    </Toggle>
                    { this.state.makeACredit && (
                        <View style={[styles.flexRowAlignCenter, {justifyContent: 'space-between', alignItems: 'center'}]}>
                            <Toggle style={{marginBottom: 15}} checked={this.state.is110} onChange={() => this.setState({is110: !this.state.is110})}>
                                {evaProps => <Text {...evaProps} >{this.state.is110 ? 'J\'emprunte à 110%' : 'Je n\'emprunte pas à 110%'}</Text>}
                            </Toggle>
                            <TooltipsHelper showAsAlert={true} messageInfo={'Un emprunt à 110% est une demande de financement de la totalité de votre projet en incluant aussi les frais de notaires, bancaires etc...'} />
                        </View>)}
                    { !this.state.is110 && this.state.makeACredit &&
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Apport (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.apport}
                                    onTextChange={(text) => this.setState({apport: text})}/>
                    </View>}
                    { this.state.makeACredit && (
                        <View>
                            <View style={[styles.flexRowAlignCenter, {justifyContent: 'space-between', alignItems: 'center'}]}>
                                <Toggle style={{marginBottom: 15}} checked={this.state.includeFurnitureInCredit} onChange={() => this.setState({includeFurnitureInCredit: !this.state.includeFurnitureInCredit})}>
                                    {evaProps => <Text {...evaProps} >{this.state.includeFurnitureInCredit ? 'J\'inclus les meubles dans le prêt' : 'Je n\'inclus pas les meubles dans le prêt'}</Text>}
                                </Toggle>
                            </View>
                            <InputField label={'Montant des meubles (€)'}
                                        type={'numeric'}
                                        style={{marginRight: 15}}
                                        value={this.state.furnitureCost}
                                        onTextChange={(text) => this.setState({furnitureCost: text})}/>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Frais de garantie bancaire (€)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.creditWarrantyCost}
                                            onTextChange={(text) => this.setState({creditWarrantyCost: text})}/>
                                <TooltipsHelper  showAsAlert={true} messageInfo={`Ces frais concernent le coût d'une hypothèque, d'un ppd, ou d'une caution par exemple. Ils s'élèvent en général à environ ${BANK_GARANTY_PERCENT * 100}% du montant du prêt.`} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Frais de dossier (€)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.bankCharges}
                                            onTextChange={(text) => this.setState({bankCharges: text})}/>
                                <TooltipsHelper  showAsAlert={true} messageInfo={`En moyenne les frais de dossier sont autour de ${BANK_FOLDER_COST}€`} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={<Text style={styles.inputLabelPrimary}>Durée de crédit (nombre d\'années) <Text style={styles.formStarRequired}>*</Text></Text>}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.creditTime}
                                            onTextChange={(text) => this.setState({creditTime: text})}/>
                                <TooltipsHelper showAsAlert={true} messageInfo={'En moyenne les banques n\'excèdent pas la durée de 20 ans pour un investissement locatif.'} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={<Text style={styles.inputLabelPrimary}>Taux du crédit (%) <Text style={styles.formStarRequired}>*</Text></Text>}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.bankRate}
                                            onTextChange={(text) => this.setState({bankRate: text})}/>
                                <TooltipsHelper showAsAlert={true} messageInfo={'Le taux donné ici n\'est qu\'indicatif, et sur une durée de 20 ans'} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Mensualité d\'autres emprunts (€)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.actualCreditMensualities}
                                            onTextChange={(text) => this.setState({actualCreditMensualities: text})}/>
                            </View>
                        </View>
                    )}
                </ScrollView>
                <Icon.Button name="save"
                             backgroundColor={appColors.success}
                             onPress={() => this.save()}
                             style={{justifyContent: 'center'}}>
                    Sauvegarder
                </Icon.Button>
            </Fragment>
        )
    }

    /**
     * Emit datas to parent if required field are  valid
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
     * Check if all required field are filled
     * @returns {string}
     * @private
     */
    _checkFormValues() {
        let messageError = '';
        if (!this.state.creditTime) {
            messageError = messageError + '- Durée du crédit requis \n';
        }
        if (!this.state.bankRate) {
            messageError = messageError + '- Taux d\'emprunt requis \n';
        }
        return messageError;
    }
}