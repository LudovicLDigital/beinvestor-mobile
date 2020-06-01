import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import {Select, SelectItem, Text, Toggle} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TooltipsHelper from "../subcomponent/tooltips-helper";
import InputField from "../subcomponent/form/input-field";
import FiscalTypeService from "../../shared/services/entities/fiscal-type-service";

/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : préinputed values for the form
 */
export default class SimulatorFiscalityForm extends Component {
    fiscalTypeService;
    constructor(props) {
        super(props);
        this.fiscalTypeService = new FiscalTypeService();
        this.state = {
            inHandProject: (typeof this.props.recoverredFormValues.inHandProject !== 'undefined' && this.props.recoverredFormValues.inHandProject !== null)  ? this.props.recoverredFormValues.inHandProject : true,
            percentRentManagement: this.props.recoverredFormValues.percentRentManagement ? this.props.recoverredFormValues.percentRentManagement : null,
            comptableCost: this.props.recoverredFormValues.comptableCost ? this.props.recoverredFormValues.comptableCost : '0',
            pnoCost: this.props.recoverredFormValues.pnoCost ? this.props.recoverredFormValues.pnoCost : null,
            gliPercent: this.props.recoverredFormValues.gliPercent ? this.props.recoverredFormValues.gliPercent : null,
            vlInsurancePercent: this.props.recoverredFormValues.vlInsurancePercent ? this.props.recoverredFormValues.vlInsurancePercent : null,
            fiscalTypeId: this.props.recoverredFormValues.fiscalTypeId ? this.props.recoverredFormValues.fiscalTypeId : 1,
            professionnalSalary: this.props.recoverredFormValues.professionnalSalary ? this.props.recoverredFormValues.professionnalSalary : '0',
            annualRent: this.props.recoverredFormValues.annualRent ? this.props.recoverredFormValues.annualRent : '0',

            fiscalTypes: null,
            selectedFiscalType: null
        }
    }


    componentDidMount(): void {
        this.fiscalTypeService.getFiscalTypes().then(async (types) => {
            this.setState({
                fiscalTypes: types
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                    <View style={[styles.flexRowAlignCenter, {justifyContent: 'space-between', alignItems: 'center'}]}>
                        <Toggle style={{marginBottom: 15}} checked={this.state.inHandProject} onChange={() => this.toggleInHand()}>
                            {evaProps => <Text {...evaProps} >{this.state.inHandProject ? 'Projet clef en main' : 'J\'entre moi-même les montants'}</Text>}
                        </Toggle>
                        <TooltipsHelper  showAsAlert={true} messageInfo={'"Projet clef en main" laisse le simulateur determiner tous les frais annexes (délégation, pno...) pour vous'} />
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
                                <TooltipsHelper showAsAlert={true} messageInfo={'En moyenne le pourcentage d\'une assurance vacance locative (periode où le bien n\'est pas occupé) est de 1% du loyer.'} />
                            </View>
                        </View>
                    )}
                    <View style={styles.flexRowAlignCenter}>
                        <InputField label={'Frais de comptabilité annuelle (€)'}
                                    type={'numeric'}
                                    style={{marginRight: 15}}
                                    value={this.state.comptableCost}
                                    onTextChange={(text) => this.setState({comptableCost: text})}/>
                        <TooltipsHelper showAsAlert={true} messageInfo={`Prendre un comptable est judicieux et vous apportera de nombreux avantages dans le cadre de régime au réel !`} />
                    </View>
                    { this.state.fiscalTypes && this.state.fiscalTypes !== null  && this.state.fiscalTypes.length > 0 &&
                    <View style={styles.flexRowAlignCenter}>
                        <Select
                            style={{flex: 1}}
                            label={evaProps => <Text {...evaProps} style={styles.inputLabelPrimary}>Choisir un régime fiscal</Text>}
                            placeholder={evaProps => <Text {...evaProps} style={[evaProps.style]}>Par défaut, Micro-foncier</Text>}
                            value={evaProps => <Text {...evaProps} >{this.state.selectedFiscalType ? this.state.selectedFiscalType.name : ''}</Text>}
                            onSelect={(index) => this.selectFiscalType(index.row)}>
                            {this.state.fiscalTypes.map((type) => {
                                return (<SelectItem key={type.id} title={evaProps => <Text {...evaProps} >{type.name}</Text>}/>)
                            })}
                        </Select>
                        {this.state.selectedFiscalType && <TooltipsHelper messageInfo={this.state.selectedFiscalType.description}/>}
                    </View>}
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