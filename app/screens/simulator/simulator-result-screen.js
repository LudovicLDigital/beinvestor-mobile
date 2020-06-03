import React, {Component} from "react";
import {SafeAreaView, ScrollView, View,} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import {Button, Icon, Text} from "@ui-kitten/components/ui/index";
import HeaderBar from "../../component/subcomponent/header-bar";
import SimulatorPreviewResult from "../../component/simulator/simulator-preview-result";
import SimulatorCardResult from "../../component/simulator/cards/simulator-card-result";
import SimulatorCashflowChart from "../../component/simulator/cards/simulator-cashflow-chart";
import SimulatorFiscalityDetail from "../../component/simulator/cards/simulator-fiscality-detail";
import SimulatorCreditDetail from "../../component/simulator/cards/simulator-credit-detail";
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

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
            isLookingForDetails: false,
            initialized: false
        };
    }

    componentDidMount(): void {
        if (this.props.route && this.props.route.params) {
            this._setSimulatorObject();
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.setState({
                    initialized: false,
                })
            });
        }

    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.route && this.props.route.params && !this.state.initialized) {
            this._setSimulatorObject();
        }
    }

    componentWillUnmount(): void {
        this._unsubscribe.remove();
    }

    /**
     * Set the state with the route param
     * @private
     */
    _setSimulatorObject() {
        const result = this.props.route.params.resultDatas;
        if (result) {
            if (result && result !== null) {
                this.setState({
                    simulatorReturnObject: result,
                    initialized: true
                });
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar previousRoute={(this.state.isEditingApart ? this.props.route.name : null)} route={(this.props.route.name)} navigation={this.props.navigation}/>
                {this.state.simulatorReturnObject && this.state.simulatorReturnObject !== null && (
                    <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[styles.fullScreen ]}>
                        {!this.state.isLookingForDetails &&
                        <Button
                            size={'tiny'}
                            style={[styles.backgroundPrimary, {alignSelf: 'flex-end'}]}
                            onPress={() => this._newSimulation()}>Nouveau calcul</Button>}
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
                        <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <BannerAd  size={BannerAdSize.LARGE_BANNER} unitId={TestIds.BANNER} />
                        </View>
                        {this.state.isLookingForDetails &&
                        <View>
                            <View style={[styles.flexRowAlignCenter, styles.flexRowBetween,{marginTop: 15}]}>
                                <Button size={'tiny'} style={[styles.backgroundPrimary]} onPress={() => this._newSimulation()}>Nouveau calcul</Button>
                                <Button size={'tiny'} style={[styles.backgroundPrimary]} onPress={() => this._showDetails()}>Fermer</Button>
                            </View>
                            <SimulatorCardResult title={'Cashflow'} containerStyle={{marginTop: 20}}>
                                <SimulatorCashflowChart simulatorDatasReceived={this.state.simulatorReturnObject}/>
                            </SimulatorCardResult>
                            <SimulatorCardResult title={'Fiscalité'} containerStyle={{marginTop: 20}}>
                                <SimulatorFiscalityDetail simulatorDatasReceived={this.state.simulatorReturnObject}/>
                            </SimulatorCardResult>
                            {this.state.simulatorReturnObject.simulatorDatas.bankStats && this.state.simulatorReturnObject.simulatorDatas.bankStats !== null &&
                            <SimulatorCardResult title={'Emprunt'} containerStyle={{marginTop: 20}}>
                                <SimulatorCreditDetail simulatorDatasReceived={this.state.simulatorReturnObject}/>
                            </SimulatorCardResult>}
                        </View>}
                    </ScrollView>)
                }
            </SafeAreaView>
        )
    }

    /**
     * Hide preview of result and open the details
     * @private
     */
    _showDetails() {
        this.setState({isLookingForDetails: !this.state.isLookingForDetails});
    }

    /**
     * Reset result to start a new simulator
     * @private
     */
    async _newSimulation() {
        await this.setState({
            simulatorReturnObject: null,
            isLookingForDetails: false,
        });
        this.props.navigation.goBack();
    }
}