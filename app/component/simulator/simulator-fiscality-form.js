import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import {Text, Toggle} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TooltipsHelper from "../subcomponent/ui-tools/tooltips-helper";
import InputField from "../subcomponent/form/input-field";
import SectionDivider from "../subcomponent/form/section-divider";

/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : préinputed values for the form
 */
export default class SimulatorFiscalityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inHandProject: (typeof this.props.recoverredFormValues.inHandProject !== 'undefined' && this.props.recoverredFormValues.inHandProject !== null)  ? this.props.recoverredFormValues.inHandProject : true,
            percentRentManagement: this.props.recoverredFormValues.percentRentManagement ? this.props.recoverredFormValues.percentRentManagement : null,
            comptableCost: this.props.recoverredFormValues.comptableCost ? this.props.recoverredFormValues.comptableCost : '0',
            pnoCost: this.props.recoverredFormValues.pnoCost ? this.props.recoverredFormValues.pnoCost : null,
            gliPercent: this.props.recoverredFormValues.gliPercent ? this.props.recoverredFormValues.gliPercent : null,
            vlInsurancePercent: this.props.recoverredFormValues.vlInsurancePercent ? this.props.recoverredFormValues.vlInsurancePercent : null,
            previsionalRentCharge: this.props.recoverredFormValues.previsionalRentCharge ? this.props.recoverredFormValues.previsionalRentCharge : '0',
            chargeCopro: this.props.recoverredFormValues.chargeCopro ? this.props.recoverredFormValues.chargeCopro : '0',

        }
    }


    componentDidMount(): void {}

    render() {
        return (
            <>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <SectionDivider sectionName={'Les charges'}/>
                    <View style={[styles.flexRowAlignCenter, {justifyContent: 'space-between', alignItems: 'center'}]}>
                        <Toggle style={{marginBottom: 15}} checked={this.state.inHandProject} onChange={() => this.toggleInHand()}>
                            {evaProps => <Text {...evaProps} >{this.state.inHandProject ? 'Projet clef en main' : 'J\'entre moi-même les montants'}</Text>}
                        </Toggle>
                        <TooltipsHelper  showAsAlert={true} messageInfo={'"Projet clef en main" laisse le simulateur déterminer tous les frais annexes (délégation, pno...) pour vous'} />
                    </View>
                    { !this.state.inHandProject && (
                        <View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Pourcentage prélévé pour la gestion locative (%)'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.percentRentManagement}
                                            onTextChange={(text) => this.setState({percentRentManagement: text})}/>
                                <TooltipsHelper showAsAlert={true} messageInfo={`En moyenne le pourcentage prélévé pour la gestion locative est de 7% du loyer.`} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Pourcentage de l\'assurance loyer impayés'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.gliPercent}
                                            onTextChange={(text) => this.setState({gliPercent: text})}/>
                                <TooltipsHelper showAsAlert={true} messageInfo={'En moyenne le pourcentage d\'une assurance loyer impayés est de 3% du loyer.'} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Assurance PNO'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.pnoCost}
                                            onTextChange={(text) => this.setState({pnoCost: text})}/>
                                <TooltipsHelper showAsAlert={true} messageInfo={'L\'assurance propriétaire non-occupant est obligatoire en tant que propriétaire bailleur.'} />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <InputField label={'Pourcentage de l\'assurance vacance locative'}
                                            type={'numeric'}
                                            style={{marginRight: 15}}
                                            value={this.state.vlInsurancePercent}
                                            onTextChange={(text) => this.setState({vlInsurancePercent: text})}/>
                                <TooltipsHelper showAsAlert={true} messageInfo={'En moyenne le pourcentage d\'une assurance vacance locative (période où le bien n\'est pas occupé) est de 1% du loyer.'} />
                            </View>
                        </View>
                    )}
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Frais de comptabilité annuelle (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.comptableCost}
                                    onTextChange={(text) => this.setState({comptableCost: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={`En moyenne, 500€ par bien, cela est très variable d'un comptable à l'autre et selon le régime fiscal choisi.`} />
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
                        <TooltipsHelper showAsAlert={true} messageInfo={'Les charges de copropriété sont les charges communes à tous les copropriétaires (ascenseur, syndic etc...)'}/>
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

    /**
     * Change field visibility if user will more advanced field to fill
     */
    toggleInHand() {
        const inHand = !this.state.inHandProject;
        this.setState({
            inHandProject: inHand,
            percentRentManagement: inHand ? null : '0',
            comptableCost: inHand ? null : '0',
            gliPercent: inHand ? null : '0',
            vlInsurancePercent: inHand ? null : '0'
        })
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
}