import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {appColors, styles} from "../../../shared/styles/global";
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import SectionDivider from "../../subcomponent/form/section-divider";
import FillingBar from "../../subcomponent/filling-bar";

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
        const allCharges = (chargesObj.creditInsurance + chargesObj.gliCost + chargesObj.rentGestionCost + chargesObj.secureCost + chargesObj.vlInsuranceCost) *12 + sessionValues.comptableCost + sessionValues.pnoCost;
        let isMeubleReal = false;
        if (this.state.simData.simulatorDatas.fiscalType.id === 4 || this.state.simData.simulatorDatas.fiscalType.id === 5) {
            isMeubleReal = true;
        }
        this.setState({
            deductiveChargeAmount: allCharges,
            amortissements: isMeubleReal ? this.props.simulatorDatasReceived.fiscality.amortissementAmount.for5Year : 0,
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
                    <FillingBar
                        containerStyle={{marginTop: 15}}
                        title={`Charge déductibles : ${this.state.deductiveChargeAmount}€`}
                        fillingCoef={this.state.deductiveChargeAmount}
                        maxFill={this.state.totalFiscalCount}
                        fillingColor={'#fffe1f'}/>
                    {this.state.amortissements > 0 &&
                    <FillingBar
                        containerStyle={{marginTop: 15}}
                        title={`Amortissements : ${this.state.amortissements}€`}
                        fillingCoef={this.state.amortissements}
                        maxFill={this.state.totalFiscalCount}
                        fillingColor={'#007AC1'}/>}
                    <FillingBar
                        containerStyle={{marginTop: 15}}
                        title={`Impôt sur le revenu : ${this.state.taxIR}€`}
                        fillingCoef={this.state.taxIR}
                        maxFill={this.state.totalFiscalCount}
                        fillingColor={'#3ACCE1'}/>
                    <FillingBar
                        containerStyle={{marginTop: 15}}
                        title={`Prélèvement sociaux : ${this.state.taxPS}€`}
                        fillingCoef={this.state.taxPS}
                        maxFill={this.state.totalFiscalCount}
                        fillingColor={'#3497FD'}/>
                    {this.state.otherTaxes > 0 &&
                    <FillingBar containerStyle={{marginTop: 15}}
                                title={`Autres taxes : ${this.state.otherTaxes}€`}
                                maxFill={this.state.totalFiscalCount}
                                fillingCoef={this.state.otherTaxes}
                                fillingColor={appColors.success}/>}

                </View>}
            </View>
        )
    }

}