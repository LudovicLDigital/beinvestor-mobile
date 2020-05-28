import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {VictoryPie} from 'victory-native';
import {appColors, styles} from "../../shared/styles/global";
import MatIcon from 'react-native-vector-icons/MaterialIcons';
const graphicColor = ['#665EFF', '#007AC1', '#3ACCE1'];

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
            graphicData: [{ y: 0 }, { y: 0 }, { y: 100 }]
        };
    }


    componentDidMount(): void {
        const chargesObj = this.state.simData.fiscality.totalDeductiveCharges;
        let allCharges = chargesObj.creditInsurance + chargesObj.gliCost + chargesObj.rentGestionCost + chargesObj.secureCost + chargesObj.vlInsuranceCost;
        const sessionValues = this.state.simData.simulatorDatas.userSimulatorSessionValues;
        allCharges = (allCharges + sessionValues.comptableCost + sessionValues.pnoCost) / 12;
        const taxes = Math.round(((this.state.simData.fiscality.taxIR + this.state.simData.fiscality.taxPS + this.state.simData.simulatorDatas.userEstate.taxeFonciere) / 12));
        const chargeAndCredit = Math.round((this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance + allCharges));
        this.setState({
            graphicData: [
                { x: `-${taxes}€ Impôts et taxes`,y: taxes},
                { x: `-${chargeAndCredit}€\n Charges\n et\n emprunt`,y: chargeAndCredit},
                { x: `${this.state.simData.simulatorDatas.userEstate.monthlyRent}€\n Loyer`, y: this.state.simData.simulatorDatas.userEstate.monthlyRent },
            ]
        });
    }

    render() {
        return (
            <View style={{flex:1, alignItems: 'center'}}>
                <VictoryPie animate={{ duration: 2000, easing: 'exp' }}
                            data={this.state.graphicData}
                            style={{labels: {fontSize: 10, fontWeight: "bold", padding: 5}}}
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
        )
    }

}