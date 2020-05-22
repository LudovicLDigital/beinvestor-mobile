import React, {Component} from "react";
import {
    View, ScrollView
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
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
        const determinedWarrantyCost = (BANK_GARANTY_PERCENT * (work + buyPrice + notarialCost));
        this.state = {
            makeACredit: (typeof this.props.recoverredFormValues.makeACredit !== 'undefined' && this.props.recoverredFormValues.makeACredit !== null) ? this.props.recoverredFormValues.makeACredit : true,
            is110: (typeof this.props.recoverredFormValues.is110 !== 'undefined' && this.props.recoverredFormValues.is110 !== null) ? this.props.recoverredFormValues.is110 : true,
            apport: this.props.recoverredFormValues.apport ? this.props.recoverredFormValues.apport : null,
            creditWarrantyCost: this.props.recoverredFormValues.creditWarrantyCost ? this.props.recoverredFormValues.creditWarrantyCost : determinedWarrantyCost.toString(),
            bankCharges: this.props.recoverredFormValues.bankCharges ? this.props.recoverredFormValues.bankCharges : (BANK_FOLDER_COST).toString(),
            creditTime: this.props.recoverredFormValues.creditTime ? this.props.recoverredFormValues.creditTime : '20',
            bankRate: this.props.recoverredFormValues.bankRate ? this.props.recoverredFormValues.bankRate :TX_BANK,
            actualCreditMensualities: this.props.recoverredFormValues.actualCreditMensualities ? this.props.recoverredFormValues.actualCreditMensualities :null,
            furnitureCost: this.props.recoverredFormValues.furnitureCost ? this.props.recoverredFormValues.furnitureCost :null,
            includeFurnitureInCredit: this.props.recoverredFormValues.includeFurnitureInCredit ? this.props.recoverredFormValues.includeFurnitureInCredit :null,
        }
    }

    render() {
        return (
            <>
                <ScrollView style={[{flex: 1}]}>
                    <Toggle style={{alignSelf: 'flex-start', marginBottom: 15}} checked={this.state.makeACredit} onChange={() => this.setState({makeACredit: !this.state.makeACredit})}>
                        {evaProps => <Text {...evaProps} >{this.state.makeACredit ? 'Je fais un emprunt' : 'Je ne fais pas d\'emprunt'}</Text>}
                    </Toggle>
                    { this.state.makeACredit && (
                        <View style={[styles.flexRowAlignCenter, {justifyContent: 'space-between', alignItems: 'center'}]}>
                            <Toggle style={{marginBottom: 15}} checked={this.state.is110} onChange={() => this.setState({is110: !this.state.is110})}>
                                {evaProps => <Text {...evaProps} >{this.state.is110 ? 'J\'emprunte à 110%' : 'Je n\'emprunte pas à 110%'}</Text>}
                            </Toggle>
                            <TooltipsHelper messageInfo={'Un emprunt à 110% est une demande de financement de la totalité de votre projet en incluant aussi les frais de notaires, bancaires etc...'} />
                        </View>)}
                    { !this.state.is110 &&
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
                            { this.state.includeFurnitureInCredit &&
                            <InputField label={'Montant des meubles (€)'}
                                        type={'numeric'}
                                        style={{marginRight: 15}}
                                        value={this.state.furnitureCost}
                                        onTextChange={(text) => this.setState({furnitureCost: text})}/>}
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Frais de garantie bancaire (€)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.creditWarrantyCost}
                                            onTextChange={(text) => this.setState({creditWarrantyCost: text})}/>
                                <TooltipsHelper messageInfo={`C'est frais concernent les coûts d'hypothèque, ppd, caution par exemple. Ils s'élèvent en général à environ ${BANK_GARANTY_PERCENT * 100}% du montant du prêt.`} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Frais de dossier (€)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.bankCharges}
                                            onTextChange={(text) => this.setState({bankCharges: text})}/>
                                <TooltipsHelper messageInfo={`En moyenne les frais de dossier sont autour de ${BANK_FOLDER_COST}€`} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Durée de crédit (nombre d\'années)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.creditTime}
                                            onTextChange={(text) => this.setState({creditTime: text})}/>
                                <TooltipsHelper messageInfo={'En moyenne les banques n\'excèdent pas la durée de 20 ans pour un investissement locatif.'} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Taux du crédit (%)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.bankRate}
                                            onTextChange={(text) => this.setState({bankRate: text})}/>
                                <TooltipsHelper messageInfo={'Le taux donné ici n\'est qu\'indicatif, et sur une durée de 20 ans'} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Mensualité de crédit actuelles (€)'}
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
            </>
        )
    }

    save() {
        this.props.formValuesReturned(this.state);
    }
}