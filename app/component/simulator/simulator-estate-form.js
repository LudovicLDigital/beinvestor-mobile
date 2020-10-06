import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import TooltipsHelper from "../subcomponent/ui-tools/tooltips-helper";
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
const faUnit = [
    '%',
    '€'
];
const NOTARIAL_PERCENT = 0.085;
const BUYPRICE_FIELD = 'prix achat fai';
const FA_FIELD = 'frais d\'agence';
const WORK_FIELD = 'travaux';
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
            secureSaving: this.props.recoverredFormValues.secureSaving ? this.props.recoverredFormValues.secureSaving : null,
            taxeFonciere: this.props.recoverredFormValues.taxeFonciere ? this.props.recoverredFormValues.taxeFonciere : '0',

            selectWork: null,
            selectedUnitFA: faUnit[0]
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
    setNotarialCost() {
        let priceWithoutFA;
        if (this.state.selectedUnitFA === faUnit[1]) {
            priceWithoutFA = this.state.buyPrice - this.state.faiPercent;
        } else {
            priceWithoutFA = this.state.buyPrice - (this.state.buyPrice/(1+this.state.faiPercent));
        }
        const notarialcost = (NOTARIAL_PERCENT * priceWithoutFA).toFixed(2);
        this.setState({notarialCost: notarialcost})
    }
    onGlobalPriceChange(field, value, isABlurEvent) {
        switch (field) {
            case BUYPRICE_FIELD :
                if (isABlurEvent) {
                    this.setNotarialCost();
                    this.setSafeCost();
                } else {
                    this.setState({buyPrice: value});
                }
                break;
            case FA_FIELD :
                if (isABlurEvent) {
                    this.setNotarialCost();
                } else {
                    this.setState({faiPercent: value});
                }
                break;
            case WORK_FIELD :
                if (isABlurEvent) {
                    this.setSafeCost();
                } else {
                    this.setState({workCost: value});
                }
                break;
        }
    }
    setSafeCost() {
        const safed = (((Number.parseFloat(this.state.buyPrice) + Number.parseFloat(this.state.workCost)) * 0.01)/12).toFixed(1);
        this.setState({secureSaving: safed});
    }
    render() {
        return (
            <>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <SectionDivider sectionName={'Le bien'}/>
                    <Toggle style={{alignSelf: 'flex-start', marginBottom: 15}} checked={!this.state.noFai} onChange={() => this.setState({noFai: !this.state.noFai})}>
                        {evaProps => <Text {...evaProps} >{this.state.noFai ? 'Pas de frais d\'agence' : 'Il y a des frais d\'agence'}</Text>}
                    </Toggle>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={<Text style={styles.inputLabelPrimary}>Prix {this.state.noFai ? '' : 'frais d\'agence inclus'} (€) <Text style={styles.formStarRequired}>*</Text></Text>}
                                    type={'numeric'}
                                    style={{marginRight: 15, flex: 2}}
                                    value={this.state.buyPrice}
                                    onBlur={() => this.onGlobalPriceChange(BUYPRICE_FIELD, null, true)}
                                    onTextChange={(text) => this.onGlobalPriceChange(BUYPRICE_FIELD, text, false)}/>
                    </View>
                    {!this.state.noFai &&
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={`Frais d'agence`}
                                    type={'numeric'}
                                    style={{marginRight: 15, flex: 2}}
                                    value={this.state.faiPercent}
                                    onBlur={() =>this.onGlobalPriceChange(FA_FIELD, null, true)}
                                    onTextChange={(text) => this.onGlobalPriceChange(FA_FIELD, text, false)}/>
                        <Select
                            style={{flex: 1}}
                            value={evaProps => <Text {...evaProps} >{this.state.selectedUnitFA}</Text>}
                            onSelect={(index) => this.faUnitChange(index.row)}>
                            <SelectItem title={evaProps => <Text {...evaProps} >{faUnit[0]}</Text>}/>
                            <SelectItem title={evaProps => <Text {...evaProps} >{faUnit[1]}</Text>}/>
                        </Select>
                    </View>}
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
                                    onBlur={() =>this.onGlobalPriceChange(WORK_FIELD, null, true)}
                                    onTextChange={(text) => this.onGlobalPriceChange(WORK_FIELD, text, false)}/>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Frais de notaire (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.notarialCost}
                                    onTextChange={(text) => this.setState({notarialCost: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={'Les frais de notaire s\'élèvent en moyenne à 8.5% du prix du bien, si vous laissez ce champs vide, nous le calculerons pour vous'}/>
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
            if (this.state.selectedUnitFA === faUnit[1]) {
                const priceWithoutFa = this.state.buyPrice - this.state.faiPercent;
                const faPercent = ((this.state.faiPercent / priceWithoutFa) * 100).toFixed(2);
                this.setState({faiPercent: faPercent});
                this.props.formValuesReturned(this.state);
            } else {
                this.props.formValuesReturned(this.state);
            }
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
        return messageError;
    }

    faUnitChange(row) {
        this.setState({selectedUnitFA: faUnit[row]});
        this.setNotarialCost();
    }
}