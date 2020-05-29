import React, {Component} from "react";
import {Text, View} from "react-native";
import {appColors, styles} from "../../../shared/styles/global";
import SectionDivider from "../../subcomponent/form/section-divider";
import FillingBar from "../../subcomponent/filling-bar";
import TooltipsHelper from "../../subcomponent/tooltips-helper";

/**
 * PROPS :
 * - simulatorDatasReceived : the datas of the simulator
 * - containerStyle: style for the main Container
 */
export default class SimulatorFiscalityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simData: this.props.simulatorDatasReceived,
            deductiveChargeAmount: 0,
            taxPS: this.props.simulatorDatasReceived.fiscality.taxPS,
            taxIR: this.props.simulatorDatasReceived.fiscality.taxIR,
            amortissements: 0,
            otherTaxes: this.props.simulatorDatasReceived.simulatorDatas.userEstate.taxeFonciere,
            totalFiscalCount: null,
        };
    }


    componentDidMount(): void {
        const chargesObj = this.state.simData.fiscality.totalDeductiveCharges;
        const sessionValues = this.state.simData.simulatorDatas.userSimulatorSessionValues;
        const allCharges = chargesObj.creditInsurance + chargesObj.gliCost + chargesObj.rentGestionCost + chargesObj.secureCost  + chargesObj.vlInsuranceCost + sessionValues.comptableCost + sessionValues.pnoCost;
        let isMeubleReal = false;
        if (this.state.simData.simulatorDatas.fiscalType.id === 4 || this.state.simData.simulatorDatas.fiscalType.id === 5) {
            isMeubleReal = true;
        }
        this.setState({
            deductiveChargeAmount: Math.round(allCharges*100)/100,
            amortissements: isMeubleReal ? Math.round(this.props.simulatorDatasReceived.fiscality.amortissementAmount.for5Year*100)/100 : 0,
            totalFiscalCount: (allCharges + this.state.amortissements + this.state.taxPS + this.state.taxIR + this.state.otherTaxes)
        });
    }

    render() {
        return (
            <View style={{flex:1, alignItems: 'center'}}>
                <Text>Régime choisi : {this.state.simData.simulatorDatas.fiscalType.name}</Text>
                <Text style={{fontSize: 12}}>{this.state.simData.simulatorDatas.fiscalType.description}</Text>
                <SectionDivider sectionName={'Détails à l\'année'}/>
                {this.state.totalFiscalCount !== null && <View style={[{flex: 1, alignItems: 'flex-start'}]}>
                    {this.state.amortissements > 0 && <Text style={{fontSize: 10}}>* Pendant les 5 premières années où les amortissements sont les plus nombreux</Text>}
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Charge déductibles : ${this.state.deductiveChargeAmount}€`}
                            fillingCoef={this.state.deductiveChargeAmount}
                            maxFill={this.state.totalFiscalCount}
                            fillingColor={'#fffe1f'}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'Les charges déductibles de vos impôts sont tous les montants ayant un lien direct avec votre bien et n\'étant pas liés aux amortissements, comme par exemple la taxe foncière (ici dans la section "Autres taxes"), la gestion locative...'}/>
                    </View>
                    {this.state.amortissements > 0 &&
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Amortissements : ${this.state.amortissements}€`}
                            fillingCoef={this.state.amortissements}
                            maxFill={this.state.totalFiscalCount}
                            fillingColor={appColors.primary}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'Les amortissements sont des "déductions" étalées sur le temps. Ils sont applicables dans les régimes meublés. On amortit par exemple les frais de notaire sur 5 ans, les travaux sur 10ans etc...'}/>
                    </View>}
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Impôt sur le revenu : ${this.state.taxIR}€`}
                            fillingCoef={this.state.taxIR}
                            maxFill={this.state.totalFiscalCount}
                            fillingColor={'#3ACCE1'}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'L\'impôt sur le revenu est calculé selon votre TMI (Tranche Marginale d\'Imposition) et prend en compte la totalité de vos revenus (locatifs, professionnels...)'}/>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Prélèvement sociaux : ${this.state.taxPS}€`}
                            fillingCoef={this.state.taxPS}
                            maxFill={this.state.totalFiscalCount}
                            fillingColor={'#3497FD'}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'Les prélèvements sociaux sont payés uniquement sur vos revenus locatifs imposables.'}/>
                    </View>
                    {this.state.otherTaxes > 0 &&
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar containerStyle={{marginTop: 15}}
                                    title={`Autres taxes : ${this.state.otherTaxes}€`}
                                    maxFill={this.state.totalFiscalCount}
                                    fillingCoef={this.state.otherTaxes}
                                    fillingColor={appColors.success}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'Les "autres taxes" sont en générales des charges déductible, les séparer permet de mieux les distinguer ici. On y inclut ici la taxe foncière ou encore la CFE.'}/>
                    </View>}

                </View>}
            </View>
        )
    }

}