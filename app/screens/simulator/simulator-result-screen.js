import React, {Component} from "react";
import {SafeAreaView, ScrollView, View,} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import {Button, Icon, Text} from "@ui-kitten/components/ui/index";
import HeaderBar from "../../component/subcomponent/header-bar";
import SimulatorPreviewResult from "../../component/simulator/simulator-preview-result";
import SimulatorCardResult from "../../component/simulator/simulator-card-result";
import SimulatorCashflowChart from "../../component/simulator/simulator-cashflow-chart";

const ArrowDownIcon = (style) => (
    <Icon {...style}
          fill={appColors.dark} name='arrow-ios-downward' />
);
/**
 * PARAM :
 * - resultDatas : the datas result from api
 */
export default class SimulatorResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulatorReturnObject: null,
            isLookingForDetails: false
        };
    }

    componentDidMount(): void {
        if (this.props.route && this.props.route.params) {
            const result = this.props.route.params.resultDatas;
            if (result) {
                if (result && result !== null) {
                    this.setState({
                        simulatorReturnObject: result,
                    });
                }
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar previousRoute={(this.state.isEditingApart ? this.props.route.name : null)} route={(this.props.route.name)} navigation={this.props.navigation}/>
                {this.state.simulatorReturnObject && (
                    <ScrollView style={styles.fullScreen}>
                        {!this.state.isLookingForDetails && <Button size={'tiny'} style={[styles.backgroundPrimary, {alignSelf: 'flex-end'}]}>Nouveau calcul</Button>}
                        <SimulatorPreviewResult isLookingDetails={this.state.isLookingForDetails} simulatorReturnObject={this.state.simulatorReturnObject}/>
                        {!this.state.isLookingForDetails && <Button
                            appearance='outline'
                            style={{
                                backgroundColor: 'none',
                                color: appColors.dark,
                                marginTop: 20,
                                alignSelf: 'center',
                                borderColor: appColors.dark}}
                            onPress={() => this._showDetails()}
                            accessoryLeft={ArrowDownIcon}>{evaProps => <Text {...evaProps} style={[evaProps.style, {color: appColors.dark}]}>Voir plus de détails</Text>}</Button>}
                        {this.state.isLookingForDetails &&
                        <View>
                            <View style={[styles.flexRowAlignCenter, styles.flexRowBetween,{marginTop: 15}]}>
                                <Button size={'tiny'} style={[styles.backgroundPrimary]} >Nouveau calcul</Button>
                                <Button size={'tiny'} style={[styles.backgroundPrimary]} onPress={() => this._showDetails()}>Fermer</Button>
                            </View>
                            <SimulatorCardResult title={'Cashflow'} containerStyle={{marginTop: 20}}>
                                <SimulatorCashflowChart simulatorDatasReceived={this.state.simulatorReturnObject}/>
                            </SimulatorCardResult>
                            <SimulatorCardResult title={'Fiscalité'} containerStyle={{marginTop: 20}}>
                                <Text>Régime choisi : {this.state.simulatorReturnObject.simulatorDatas.fiscalType.name}</Text>
                                <Text style={{fontSize: 12}}>{this.state.simulatorReturnObject.simulatorDatas.fiscalType.description}</Text>
                            </SimulatorCardResult>
                            <SimulatorCardResult title={'Emprunt'} containerStyle={{marginTop: 20}}>
                                <Text>Emprunt</Text>
                            </SimulatorCardResult>
                        </View>}
                    </ScrollView>)
                }
            </SafeAreaView>
        )
    }

    _showDetails() {
        this.setState({isLookingForDetails: !this.state.isLookingForDetails});
    }
}