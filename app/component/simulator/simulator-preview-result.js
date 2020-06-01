import React, {Component} from "react";
import {Animated, Easing, StyleSheet, View} from "react-native";
import {Text} from "@ui-kitten/components/ui/index";
import {appColors, styles} from "../../shared/styles/global";
import TooltipsHelper from "../../component/subcomponent/tooltips-helper";
import Thermometer from "../../component/subcomponent/animation/thermometer";
import MatIcon from 'react-native-vector-icons/MaterialIcons';

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
    rentaNette: {flex:1, textAlign: 'center', fontSize: 12, marginTop: 10}
});
const PROJET_IS_AMAZING = "La rentabilité est excellente, le projet est viable !";
const PROJET_IS_ACCEPTABLE = "Négociation et optimisation peuvent améliorer votre rentabilité";
const PROJET_IS_BAD = "Aïe, la rentabilité locative n'est pas suffisante, à voir avec une optique patrimoniale peut-être ?";
/**
 * PROPS :
 * - isLookingDetails : boolean to indicate if preview must be reduced
 * - simulatorReturnObject : the object containing the simulator results
 */
export default class SimulatorPreviewResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulatorReturnObject: this.props.simulatorReturnObject,
            brutRentaClass: null,
            projectSentence: null,
            thermometerValue: null,
            flexSize: new Animated.Value(2),
        };
    }

    componentDidMount(): void {
        this._checkRentaRating(this.props.simulatorReturnObject.result.rentaBrutte);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLookingDetails) {
            this._reduceWithAnimation(false);
        } else if (!this.props.isLookingDetails) {
            this._reduceWithAnimation(true);
        }
    }

    /**
     * Determine the end of the animation of the thermometer depending on the renta result
     * @param renta the renta number in % which will determine the end of the animation
     * @private
     */
    _checkRentaRating(renta) {
        if (renta >= 9) {
            this.setState({
                brutRentaClass: simResultStyle.rentaIsGoodLabel,
                projectSentence: PROJET_IS_AMAZING,
                thermometerValue: 12
            });
        } else if (renta >= 5 && renta < 9) {
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

    /**
     * Method to play an animation which reduce the size of the component to let more space and more lisible place with only essential information
     * @param reversed if true, will play the animation in reverse (grow size)
     * @private
     */
    _reduceWithAnimation(reversed) {
            Animated.timing(
                this.state.flexSize,
                {
                    toValue: reversed ? 2 : 8,
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.linear, // https://easings.net/fr
                }
            ).start();
    }
    render() {
        return (
            <>
                <View style={styles.flexRowAlignCenter}>
                    {this.state.thermometerValue && <Thermometer endFrame={this.state.thermometerValue}/>}
                    <Animated.View style={[styles.flexCenter, {flex: this.state.flexSize}]}>
                        {this.state.simulatorReturnObject &&
                        <View style={[styles.flexRowAlignCenter]}>
                            <Text style={[this.state.brutRentaClass, {flex:1}]}>Rentabilité brute :{'\n'} {this.state.simulatorReturnObject.result.rentaBrutte}%</Text>
                            <TooltipsHelper  showAsAlert={true} style={{flex:1}} messageInfo={'La rentabilité brute est calculée grâce aux loyers encaissés divisé par le coût d\'acquisition du bien (travaux compris).'}/>
                        </View>}
                        {this.state.simulatorReturnObject && !this.props.isLookingDetails &&
                        <View style={[styles.flexRowAlignCenter]}>
                            <Text style={[styles.inputLabelPrimary, simResultStyle.rentaNette]}>Rentabilité nette : {'\n'} {this.state.simulatorReturnObject.result.rentaNet}%</Text>
                            <TooltipsHelper  showAsAlert={true} style={{flex:1}} messageInfo={'La rentabilité nette se calcul de la même façon que la brute mais on déduis les charges (taxe foncière, gestion...) des loyers encaissés.'}/>
                        </View>}
                    </Animated.View>
                </View>
                {!this.props.isLookingDetails && (
                <View style={styles.flexRowAlignCenter}>
                    <MatIcon size={30} color={appColors.primary} name={'local-atm'}/>
                    <Text style={[(this.state.simulatorReturnObject.result.cashflow.cashflowNetNet > 0
                        ? simResultStyle.rentaIsGoodLabel
                        : simResultStyle.rentaIsBadLabel), {flex:1}]}>Cashflow après impôts de : {'\n'} {this.state.simulatorReturnObject.result.cashflow.cashflowNetNet} € / mois</Text>
                    <TooltipsHelper  showAsAlert={true} style={{flex:1}}  messageInfo={'Il s\'agit ici du cashflow net net, soit après déduction de toutes les charges et impôts de vos loyers. S\'il est négatif cela signifie qu\'un effort d\'épargne devra être fait.'}/>
                </View>)}
                {!this.props.isLookingDetails && this.state.simulatorReturnObject.simulatorDatas.bankStats && this.state.simulatorReturnObject.simulatorDatas.bankStats !== null && (
                <View style={[styles.flexRowAlignCenter, {marginTop: 10}]}>
                    <MatIcon size={30} color={appColors.primary} name={'event'}/>
                    <Text style={{flex:1, textAlign: 'center'}}>Mensualité d'emprunt de {this.state.simulatorReturnObject.simulatorDatas.bankStats.creditDetail.mensuality} €</Text>
                </View>)}
                {!this.props.isLookingDetails && (<Text style={[this.state.brutRentaClass, {marginTop: 15}]}>{this.state.projectSentence}</Text>)}
            </>
        )
    }
}