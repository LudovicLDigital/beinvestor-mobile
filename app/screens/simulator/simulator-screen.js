import React, {Component} from 'react';
import {appColors, styles} from "../../shared/styles/global";
import {SafeAreaView, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SimulatorMenu from "../../component/simulator/simulator-menu";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BANK, ESTATE, FISCALITY, RENT, ROUTE_SIMULATOR_RESULT, SITUATION} from "../../shared/util/constants";
import SimulatorEstateForm from "../../component/simulator/simulator-estate-form";
import SimulatorFiscalityForm from "../../component/simulator/simulator-fiscality-form";
import SimulatorBankForm from "../../component/simulator/simulator-bank-form";
import {SimulatorDataSendObject} from "../../shared/util/simulator-objects";
import SimulatorService from "../../shared/services/simulator-service";
import {showInfoAlert} from "../../shared/util/ui-helpers";
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import {BANNER_AD} from '../../shared/util/constants';
import SocketService from "../../shared/services/socket-service";
import {convertRouteNameToLisible} from "../../shared/util/converter-for-route-name";
import SimulatorRentForm from "../../component/simulator/simulator-rent-form";
import SimulatorSituationForm from "../../component/simulator/simulator-situation-form";


export default class SimulatorScreen extends Component {
    simulatorService;
    constructor(props) {
        super(props);
        SocketService.connectToBackEnd();
        this.simulatorService = new SimulatorService();
        this.state = {
            isEditingApart: false,
            partShowed: null,
            formValues: SimulatorDataSendObject,
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar hideAriane={!this.state.isEditingApart} overrideBackPress={() => this.backPress()} previousRoute={(this.state.isEditingApart ? this.props.route.name : null)} route={(this.state.isEditingApart ? this.state.partShowed : this.props.route.name)} navigation={this.props.navigation}/>
                {!this.state.isEditingApart && <View style={[styles.flexCenter, {backgroundColor: appColors.white}]}>
                    <Text category={"h6"} style={{fontWeight: "bold"}}>{convertRouteNameToLisible(this.props.route.name)}</Text>
                    <Text style={{fontWeight: 'bold', color: appColors.dangerDark, fontSize: 11, textAlign: 'center', marginBottom: 10}}>Les champs marqués avec une étoile " * " sont obligatoires</Text>
                </View>}
                <Layout style={styles.fullScreen}>
                    {!this.state.isEditingApart && <SimulatorMenu clickedMenu={(menuClicked) => this._showForm(menuClicked)}/>}
                    {this.state.partShowed === ESTATE && this.state.isEditingApart && <SimulatorEstateForm formValuesReturned={(datas) => this.fillDataFor(ESTATE, datas)} recoverredFormValues={this.state.formValues}/>}
                    {this.state.partShowed === BANK && this.state.isEditingApart && <SimulatorBankForm formValuesReturned={(datas) => this.fillDataFor(BANK, datas)} recoverredFormValues={this.state.formValues}/>}
                    {this.state.partShowed === FISCALITY && this.state.isEditingApart && <SimulatorFiscalityForm formValuesReturned={(datas) => this.fillDataFor(FISCALITY, datas)} recoverredFormValues={this.state.formValues}/>}
                    {this.state.partShowed === RENT && this.state.isEditingApart && <SimulatorRentForm formValuesReturned={(datas) => this.fillDataFor(RENT, datas)} recoverredFormValues={this.state.formValues}/>}
                    {this.state.partShowed === SITUATION && this.state.isEditingApart && <SimulatorSituationForm formValuesReturned={(datas) => this.fillDataFor(SITUATION, datas)} recoverredFormValues={this.state.formValues}/>}
                    {!this.state.isEditingApart && <Icon.Button name="insert-chart"
                                                                backgroundColor={appColors.success}
                                                                onPress={() => this.runSimulator()}
                                                                style={{justifyContent: 'center'}}>
                        Lancer le simulateur
                    </Icon.Button>}
                    {!this.state.isEditingApart &&
                    <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <BannerAd
                            onAdFailedToLoad={(error) => this._bannerFailed(error)}
                            size={BannerAdSize.LARGE_BANNER}
                            unitId={BANNER_AD} />
                    </View>
                    }
                </Layout>
            </SafeAreaView>
        );
    }

    /**
     * Display the corresponding sub form with the passed part
     * @param formToShow can be estate, fiscality or bank
     * @private
     */
    _showForm(formToShow) {
        this.setState({isEditingApart: true, partShowed: formToShow})
    }

    /**
     * Override the headerbar back press to hide sub forms
     */
    backPress() {
        if (this.state.isEditingApart) {
            this.setState({isEditingApart: false});
        } else {
            this.props.navigation.goBack();
        }
    }

    /**
     * Set data emitted by sub forms
     * @param formChanged the form which have been filled
     * @param datas the datas outputed by sub form
     */
    fillDataFor(formChanged, datas) {
        switch (formChanged) {
            case ESTATE :
                this._fillEstate(datas);
                break;
            case FISCALITY:
                this._fillFiscality(datas);
                break;
            case BANK:
                this._fillBank(datas);
                break;
            case RENT:
                this._fillRent(datas);
                break;
            case SITUATION:
                this._fillSituation(datas);
                break;
        }
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the estate form (buy price, notarial cost etc...)
     * @param datas the new data enterred in form
     * @private
     */
    _fillEstate(datas) {
        this.backPress();
        this.state.formValues.noFai = datas.noFai;
        this.state.formValues.faiPercent = datas.faiPercent;
        this.state.formValues.notarialCost = datas.notarialCost;
        this.state.formValues.buyPrice = datas.buyPrice;
        this.state.formValues.surface = datas.surface;
        this.state.formValues.workCost = datas.workCost;
        this.state.formValues.secureSaving = datas.secureSaving;
        this.state.formValues.taxeFonciere = datas.taxeFonciere;
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the fiscality form (choosed fiscal type, insurances etc...)
     * @param datas the new data enterred in form
     * @private
     */
    _fillFiscality(datas) {
        this.backPress();
        this.state.formValues.percentRentManagement = datas.percentRentManagement;
        this.state.formValues.inHandProject = datas.inHandProject;
        this.state.formValues.comptableCost = datas.comptableCost;
        this.state.formValues.pnoCost = datas.pnoCost;
        this.state.formValues.gliPercent = datas.gliPercent;
        this.state.formValues.vlInsurancePercent = datas.vlInsurancePercent;
        this.state.formValues.chargeCopro = datas.chargeCopro;
        this.state.formValues.previsionalRentCharge = datas.previsionalRentCharge;
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the bank form all thing relative to a credit
     * @param datas the new data enterred in form
     * @private
     */
    _fillBank(datas) {
        this.backPress();
        this.state.formValues.makeACredit = datas.makeACredit;
        this.state.formValues.is110 = datas.is110;
        this.state.formValues.apport = datas.apport;
        this.state.formValues.furnitureCost = datas.furnitureCost;
        this.state.formValues.includeFurnitureInCredit = datas.includeFurnitureInCredit;
        this.state.formValues.creditWarrantyCost = datas.creditWarrantyCost;
        this.state.formValues.bankCharges = datas.bankCharges;
        this.state.formValues.creditTime = datas.creditTime;
        this.state.formValues.bankRate = datas.bankRate;
        this.state.formValues.actualCreditMensualities = datas.actualCreditMensualities;
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the rent form as fiscal type
     * @param datas the new data enterred in form
     * @private
     */
    _fillRent(datas) {
        this.backPress();
        this.state.formValues.fiscalTypeId = datas.fiscalTypeId;
        this.state.formValues.monthlyRent = datas.monthlyRent;
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the situation of the user
     * @param datas the new data enterred in form
     * @private
     */
    _fillSituation(datas) {
        this.backPress();
        this.state.formValues.professionnalSalary = datas.professionnalSalary;
        this.state.formValues.annualRent = datas.annualRent;
    }

    /**
     * Send request to api to do the simulation with datas
     */
    runSimulator() {
        const messageError = this._checkFormValues();
        if (messageError === '') {
            this.simulatorService.calculateProject(this.state.formValues).then((response) => {
                this.props.navigation.navigate(ROUTE_SIMULATOR_RESULT, {resultDatas: response});
            }).catch((error) => {
                console.error('ERROR TO calculateProject : ');
                console.error(error);
            })
        } else {
            showInfoAlert(messageError, true)
        }
    }

    /**
     * Check if required fields for simulator are completed
     * @returns {string} will prepare a message error with all the field and the subform concerned
     * @private
     */
    _checkFormValues() {
        let messageError = '';
        if (!this.state.formValues.buyPrice || !this.state.formValues.monthlyRent) {
            messageError = 'Partie "Bien à analyser" : \n';
            if (!this.state.formValues.buyPrice) {
                messageError = messageError + '- Prix requis \n';
            }
            if (!this.state.formValues.monthlyRent) {
                messageError = messageError + '- Loyer requis \n';
            }
        }
        if ((!this.state.formValues.buyPrice || !this.state.formValues.monthlyRent) && this.state.formValues.makeACredit) {
            messageError = messageError + 'Partie "Emprunt bancaire : " \n';
            if (!this.state.formValues.creditTime) {
                messageError = messageError + '- Durée du crédit requis \n';
            }
            if (!this.state.formValues.bankRate) {
                messageError = messageError + '- Taux d\'emprunt requis \n';
            }
        }
        return messageError;
    }

    _bannerFailed(error) {
        console.log(error);
    }
}