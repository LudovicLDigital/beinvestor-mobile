import React, {Component} from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { VictoryPie } from 'victory-native';

const graphicData = [{ y: 10 }, { y: 50 }, { y: 40 }];
const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];
/**
 * PROPS :
 * - simulatorDatas : the datas of the simulator
 * - containerStyle: style for the main Container
 */
export default class SimulatorCashflowChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <VictoryPie data={graphicData} width={250} height={250} colorScale={graphicColor} innerRadius={50} />

            </View>
        )
    }

}