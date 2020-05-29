import React, {Component} from "react";
import {Text, View} from "react-native";
import {VictoryPie} from 'victory-native';
import {appColors, styles} from "../../../shared/styles/global";
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import TooltipsHelper from "../../subcomponent/tooltips-helper";

const graphicColor = [appColors.primaryDark, '#3ACCE1', appColors.primary, appColors.secondary];

/**
 * PROPS :
 * - simulatorDatasReceived : the datas of the simulator
 * - containerStyle: style for the main Container
 */
export default class SimulatorCashflowChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simData: this.props.simulatorDatasReceived,
            cashflowNetNet: this.props.simulatorDatasReceived.result.cashflow.cashflowNetNet,
            graphicData: [{ y: 0 }, { y: 0 },{ y: 0 }, { y: 100 }],
        };
    }


    componentDidMount(): void {
        this._setGraphicNetNet();
    }
    _setGraphicNetNet() {
        const chargesObj = this.state.simData.fiscality.totalDeductiveCharges;
        let allCharges = chargesObj.creditInsurance + chargesObj.gliCost + chargesObj.rentGestionCost + chargesObj.secureCost + chargesObj.vlInsuranceCost;
        const sessionValues = this.state.simData.simulatorDatas.userSimulatorSessionValues;
        const taxes = Math.round(((this.state.simData.fiscality.taxIR + this.state.simData.fiscality.taxPS + this.state.simData.simulatorDatas.userEstate.taxeFonciere) / 12)*100)/100;
        allCharges = (Math.round(((allCharges + sessionValues.comptableCost + sessionValues.pnoCost) / 12)*100))/100;
        const graphicData = [
            { x: `-${taxes}€\n Impôts\net taxes`,y: taxes},
            { x: `${this.state.simData.simulatorDatas.userEstate.monthlyRent}€\n Loyer`, y: this.state.simData.simulatorDatas.userEstate.monthlyRent },
            { x: `-${allCharges}€\n Charges`,y: allCharges},
        ];
        if (this.state.simData.simulatorDatas.bankStats && this.state.simData.simulatorDatas.bankStats !== null) {
            graphicData.push(
                { x: `-${this.state.simData.simulatorDatas.bankStats.creditDetail.mensuality }€\n mensualité`,y: this.state.simData.simulatorDatas.bankStats.creditDetail.mensuality },)
        }
        this.setState({
            graphicData: graphicData.reverse()
        });
    }
    render() {
        return (
            <View>
                <View style={{position: 'absolute', right: 0, zIndex: 1001}}>
                    <TooltipsHelper
                        showAsAlert={true}
                        messageInfo={'"Cashflow net net" correspond à la somme restante de vos loyers après déduction des charges ET des impôts.'}/>
                </View>
                <View style={{flex:1, alignItems: 'center'}}>
                    <VictoryPie animate={{ duration: 2000, easing: 'exp' }}
                                data={this.state.graphicData}
                                style={{labels: {fontSize: 9, fontWeight: "bold", padding: 10}}}
                                width={250}
                                height={250}
                                colorScale={graphicColor}
                                innerRadius={60}
                    />
                    <View style={[styles.flexCenter,  {position: "absolute", top: '30%', zIndex: 1000}]}>
                        <MatIcon size={32} name={'local-atm'}/>
                        <Text style={[{fontWeight: "bold", fontSize: 25}]}>{this.state.cashflowNetNet}€</Text>
                        <Text style={[{color: appColors.secondaryLight, fontSize: 12}]}>Cashflow net net</Text>
                    </View>
                </View>
            </View>
        )
    }

}