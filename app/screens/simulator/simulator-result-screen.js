import React, {Component} from "react";
import {
    View,
    SafeAreaView, StyleSheet
} from "react-native";
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import {Layout, Text, Button, Icon} from "@ui-kitten/components/ui/index";
import HeaderBar from "../../component/subcomponent/header-bar";
import TooltipsHelper from "../../component/subcomponent/tooltips-helper";
import Thermometer from "../../component/subcomponent/animation/thermometer";
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {SimulatorReturnObject} from "../../shared/util/simulator-objects";
const ArrowDownIcon = (style) => (
    <Icon {...style} fill={appColors.dark} name='arrow-ios-downward' />
);
const simResultStyle = StyleSheet.create({
    rentaIsGoodLabel: {
        color: appColors.success,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rentaIsAcceptableLabel: {
        color: appColors.warning,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rentaIsBadLabel: {
        color: appColors.dangerDark,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
const PROJET_IS_AMAZING = "La rentabilité est excellente, le projet est viable !";
const PROJET_IS_ACCEPTABLE = "Négociation et optimisation peuvent améliorer votre rentabilité";
const PROJET_IS_BAD = "Aïe, la rentabilité locative n'est pas suffisante, à voir avec une optique patrimoniale peut-être ?";
/**
 * PARAM :
 * - resultDatas : the datas result from api
 */
export default class SimulatorResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulatorReturnObject: null,
            brutRentaClass: null,
            projectSentence: null,
            thermometerValue: null,
        }
    }


    componentDidMount(): void {
        if (this.props.route && this.props.route.params) {
            const result = this.props.route.params.resultDatas;
            if (result) {
                if (result && result !== null) {
                    this.setState({
                        simulatorReturnObject: result,
                    });
                    this._checkRentaRating(result.result.rentaBrutte);
                }
            }
        }
    }
    _checkRentaRating(renta) {
        if (renta >= 9.5) {
            this.setState({
                brutRentaClass: simResultStyle.rentaIsGoodLabel,
                projectSentence: PROJET_IS_AMAZING,
                thermometerValue: 12
            });
        } else if (renta >= 5 && renta < 9.5) {
            this.setState({
                brutRentaClass: simResultStyle.rentaIsAcceptableLabel,
                projectSentence: PROJET_IS_ACCEPTABLE,
                thermometerValue: 9
            });
        } else {
            this.setState({
                brutRentaClass: simResultStyle.rentaIsBadLabel,
                projectSentence: PROJET_IS_BAD,
                thermometerValue: 6
            });
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar previousRoute={(this.state.isEditingApart ? this.props.route.name : null)} route={(this.props.route.name)} navigation={this.props.navigation}/>
                {this.state.simulatorReturnObject && (
                    <Layout style={styles.fullScreen}>
                        <Button size={'small'} style={[styles.backgroundPrimary, {alignSelf: 'flex-end'}]}>Nouveau calcul</Button>
                        <View style={styles.flexRowAlignCenter}>
                            {this.state.thermometerValue && <Thermometer endFrame={this.state.thermometerValue}/>}
                            <View style={styles.flexCenter}>
                                {this.state.simulatorReturnObject &&
                                <View style={styles.flexRowAlignCenter}>
                                    <Text style={[this.state.brutRentaClass, {flex:1}]}>Rentabilité brute : {this.state.simulatorReturnObject.result.rentaBrutte}</Text>
                                    <TooltipsHelper style={{flex:1}}/>
                                </View>}
                                {this.state.simulatorReturnObject &&
                                <View style={styles.flexRowAlignCenter}>
                                    <Text style={styles.inputLabelPrimary}>Rentabilité nette : {this.state.simulatorReturnObject.result.rentaNet}</Text>
                                    <TooltipsHelper style={{flex:1}}/>
                                </View>}
                            </View>
                        </View>
                        <View style={styles.flexRowAlignCenter}>
                            <MatIcon size={30} color={appColors.primary} name={'local-atm'}/>
                            <Text style={[(this.state.simulatorReturnObject.result.cashflow.cashflowNetNet > 0
                                ? simResultStyle.rentaIsGoodLabel
                                : simResultStyle.rentaIsBadLabel), {flex:1}]}>Cashflow après impôts de {this.state.simulatorReturnObject.result.cashflow.cashflowNetNet} € par mois</Text>
                            <TooltipsHelper style={{flex:1}}/>
                        </View>
                        <View style={styles.flexRowAlignCenter}>
                            <MatIcon size={30} color={appColors.primary} name={'event'}/>
                            <Text style={{flex:1}}>Mensualité d'emprunt de {this.state.simulatorReturnObject.simulatorDatas.bankStats.creditDetail.mensuality} €</Text>
                        </View>
                        <Text style={[this.state.brutRentaClass, {marginTop: 15}]}>{this.state.projectSentence}</Text>
                        <Button
                            appearance='outline'
                            style={{
                                backgroundColor: 'none',
                                color: appColors.dark,
                                marginTop: 20,
                                alignSelf: 'center',
                                borderColor: appColors.dark}}
                            accessoryLeft={ArrowDownIcon}>Voir plus de détails</Button>
                    </Layout>)
                }
            </SafeAreaView>
        )
    }
}