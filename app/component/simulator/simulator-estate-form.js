import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import TooltipsHelper from "../subcomponent/tooltips-helper";
import InputField from "../subcomponent/form/input-field";
import {Select, SelectItem, Text, Toggle} from '@ui-kitten/components';
import SectionDivider from "../subcomponent/form/section-divider";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {showInfoAlert} from "../../shared/util/ui-helpers";

const workArray = [
    {type: 'Rénovation simple (300€/m²)', helper: 'Une rénovation simple consiste a rafraichir le bien (changement de peinture, sol, fenêtre) et dans une moindre mesure l\'électricité, la plomberie... sans toucher au gros oeuvre'},
    {type: 'Rénovation moyenne (700€/m²)', helper: 'Une rénovation moyenne sera centrée sur le rafraichissement, et la remise aux normes du bien (en electricté, plomberie, isolation...) sans toucher au gros oeuvre'},
    {type:  'Grosse rénovation (1000€/m²)', helper: 'Une grosse rénovation implique de rénover la totalité du bien en incluant le gros oeuvre comme la charpente'},
    {type: 'Construction (1500€/m²)', helper: 'La construction est le fait de créer un bien de A à Z, ici le montant est très variable et dependra des matériaux, surface et de beaucoup d\'iconnues'},
];
/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : préinputed values for the form
 */
export default class SimulatorEstateForm extends Component {
    workIndex: 0;
    constructor(props) {
        super(props);
        this.state = {
            noFai: this.props.recoverredFormValues.noFai,
            faiPercent: this.props.recoverredFormValues.faiPercent ? this.props.recoverredFormValues.faiPercent.toString() : '4',
            notarialCost: this.props.recoverredFormValues.notarialCost ? this.props.recoverredFormValues.notarialCost : null,
            buyPrice: this.props.recoverredFormValues.buyPrice ? this.props.recoverredFormValues.buyPrice : null,
            surface: this.props.recoverredFormValues.surface ? this.props.recoverredFormValues.surface : null,
            workCost: this.props.recoverredFormValues.workCost ? this.props.recoverredFormValues.workCost : '0',
            monthlyRent: this.props.recoverredFormValues.monthlyRent ? this.props.recoverredFormValues.monthlyRent : null,
            secureSaving: this.props.recoverredFormValues.secureSaving ? this.props.recoverredFormValues.secureSaving : null,
            taxeFonciere: this.props.recoverredFormValues.taxeFonciere ? this.props.recoverredFormValues.taxeFonciere : '0',
            previsionalRentCharge: this.props.recoverredFormValues.previsionalRentCharge ? this.props.recoverredFormValues.previsionalRentCharge : '0',
            chargeCopro: this.props.recoverredFormValues.chargeCopro ? this.props.recoverredFormValues.chargeCopro : '0',

            selectWork: null,
        }
    }

    /**
     * Calculate the work cost depending on the selected type of work
     * @param index the index in the select and the work array
     */
    selectWorkCost(index) {
        this.workIndex = index;
        switch (index) {
            case 0:
                this.setState({workCost: (300*this.state.surface).toFixed(2), selectWork: workArray[index]});
                break;
            case 1:
                this.setState({workCost: (700*this.state.surface).toFixed(2), selectWork: workArray[index]});
                break;
            case 2:
                this.setState({workCost: (1000*this.state.surface).toFixed(2), selectWork: workArray[index]});
                break;
            case 3:
                this.setState({workCost: (1500*this.state.surface).toFixed(2), selectWork: workArray[index]});
                break;
        }
    }
    render() {
        return (
            <>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <Text style={{fontWeight: 'bold', color: appColors.dangerDark, fontSize: 11, textAlign: 'center', marginBottom: 10}}>Les champs marqués avec une étoile " * " sont obligatoires</Text>
                    <Toggle style={{alignSelf: 'flex-start', marginBottom: 15}} checked={!this.state.noFai} onChange={() => this.setState({noFai: !this.state.noFai})}>
                        {evaProps => <Text {...evaProps} >{this.state.noFai ? 'Pas de frais d\'agence' : 'Il y a des frais d\'agence'}</Text>}
                    </Toggle>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={`Prix ${this.state.noFai ? '' : 'FAI'} (€) *`}
                                    type={'numeric'}
                                    style={{marginRight: 15, flex: 2}}
                                    value={this.state.buyPrice}
                                    onTextChange={(text) => this.setState({buyPrice: text})}/>
                        {!this.state.noFai && <InputField label={`FA en %`}
                                                          type={'numeric'}
                                                          style={{marginRight: 15, flex: 1}}
                                                          value={this.state.faiPercent}
                                                          onTextChange={(text) => this.setState({faiPercent: text})}/>}
                        <TooltipsHelper showAsAlert={true} messageInfo={'FAI correspond à "frais d\'agence inclus", soit le prix du bien comprenant les frais de l\'agence immobilière qui vend le bien.'} />
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Surface totale (m²)'}
                                    type={'numeric'}
                                    value={this.state.surface}
                                    onTextChange={(text) => this.changeSurface(text)}/>
                        <InputField label={'Taxe foncière (€)'}
                                    type={'numeric'}
                                    style={{marginLeft: 15}}
                                    value={this.state.taxeFonciere}
                                    onTextChange={(text) => this.setState({taxeFonciere: text})}/>
                    </View>
                    {this.state.surface > 0 && (
                        <View style={{flex: 1}}>
                            <View style={styles.flexRowAlignCenter}>
                                <Select
                                    style={{flex: 1}}
                                    label={evaProps => <Text {...evaProps} style={styles.inputLabelPrimary}>Choisir un type de travaux</Text>}
                                    placeholder={evaProps => <Text {...evaProps}>Type de travaux prédéfini</Text>}
                                    value={evaProps =>
                                        <Text {...evaProps}>{this.state.selectWork ? this.state.selectWork.type : ''}</Text>}
                                    onSelect={(index) => this.selectWorkCost(index.row)}>
                                    {workArray.map((work) => {
                                        return (<SelectItem key={work.type} title={evaProps => <Text {...evaProps}>{work.type}</Text>}/>)
                                    })}
                                </Select>
                                {this.state.selectWork && <TooltipsHelper messageInfo={this.state.selectWork.helper}/>}
                            </View>
                            <Text>Ou vous pouvez entrer directement le montant ci-dessous :</Text>
                        </View>)
                    }
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Travaux estimés (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.workCost}
                                    onTextChange={(text) => this.setState({workCost: text})}/>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Frais de notaire (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.notarialCost}
                                    onTextChange={(text) => this.setState({notarialCost: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'Les frais de notaire s\'élèvent en moyenne à 8.5% du prix du bien, si vous laissez ce champs vide, nous le calculerons pour vous'}/>
                    </View>
                    <SectionDivider sectionName={'Location'}/>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Loyer mensuel hors charges (€) *'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.monthlyRent}
                                    onTextChange={(text) => this.setState({monthlyRent: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'S\'il y a plusieurs biens (cas d\'un immeuble par exemple), additionner tous les loyers HC'}/>
                    </View>

                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Charges locataires mensuelles (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.previsionalRentCharge}
                                    onTextChange={(text) => this.setState({previsionalRentCharge: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'Le coût moyen des charges pour les locataires en france est de 54€/mois (Insee)'}/>
                    </View>

                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Charges de copropriété mensuelles (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.chargeCopro}
                                    onTextChange={(text) => this.setState({chargeCopro: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'Les charges de copropriété sont les charges des utilisations communes à tous les copropriétaires (ascenseur, syndic etc...)'}/>
                    </View>

                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Epargne de sécurité mensuelle (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.secureSaving}
                                    onTextChange={(text) => this.setState({secureSaving: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'Nous vous recommandons de prévoir 1% du prix du bien travaux inclus sur l\'année pour surmonter les imprévus (réparation, entretiens etc...)'}/>
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
     * Emit the datas to parent if all field required are good
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
     * Recalculate the work cost when the surface change
     * @param text
     */
    changeSurface(text) {
        this.selectWorkCost(this.workIndex);
        this.setState({surface: text})
    }

    /**
     * Check the required field filled or not
     * @returns {string} the message error with the field required
     * @private
     */
    _checkFormValues() {
        let messageError = '';
        if (!this.state.buyPrice) {
            messageError = messageError + '- Prix requis \n';
        }
        if (!this.state.monthlyRent) {
            messageError = messageError + '- Loyer requis \n';
        }
        return messageError;
    }
}