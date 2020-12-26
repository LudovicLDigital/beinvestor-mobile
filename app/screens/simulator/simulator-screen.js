import React, {useEffect, useState} from 'react';
import {appColors, styles} from "../../shared/styles/global";
import {SafeAreaView, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SimulatorMenu from "../../component/simulator/simulator-menu";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BANK, BANNER_AD, ESTATE, FISCALITY, RENT, ROUTE_SIMULATOR_RESULT, SITUATION} from "../../shared/util/constants";
import SimulatorEstateForm from "../../component/simulator/simulator-estate-form";
import SimulatorFiscalityForm from "../../component/simulator/simulator-fiscality-form";
import SimulatorBankForm from "../../component/simulator/simulator-bank-form";
import {SimulatorDataSendObject} from "../../shared/util/simulator-objects";
import SimulatorService from "../../shared/services/simulator-service";
import {showInfoAlert} from "../../shared/util/ui-helpers";
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import SocketService from "../../shared/services/socket-service";
import {convertRouteNameToLisible} from "../../shared/util/converter-for-route-name";
import SimulatorRentForm from "../../component/simulator/simulator-rent-form";
import SimulatorSituationForm from "../../component/simulator/simulator-situation-form";
import {useStoreActions, useStoreState} from "easy-peasy";
import UserInvestorProfil from "../../shared/models/user-investor-profil";
import UserInvestorProfilService from "../../shared/services/entities/user-investor-profil-service";


export default function SimulatorScreen(props) {
    const investorStoredProfil = useStoreState((state) => state.userInvestorProfil);
    const {setUserInvestorProfil, updateInvestorProfil} = useStoreActions((actions) => ({
        setUserInvestorProfil: actions.setInvestorProfil,
        updateInvestorProfil: actions.updateInvestorProfil }));
    const [isEditingApart, setisEditingApart] = useState(false);
    const [partShowed, setpartShowed] = useState(null);
    const [formValues, setformValues] = useState(SimulatorDataSendObject);
    let simulatorService = new SimulatorService();
    useEffect(() => {
        SocketService.connectToBackEnd();
        const userInvestorProfilService = new UserInvestorProfilService();
        userInvestorProfilService.getCurrentUserInvestorProfil().then((userInvestorProfilRes) => {
            setUserInvestorProfil(userInvestorProfilRes);
            _setFormWithInvestorProfil();
        }).catch((error) => {
            console.error(`ERROR TO getCurrentUserInvestorProfil in UserInvestorProfilForm : ${error}`);
            showInfoAlert('Une erreur est survenue lors de la récupération du profil investisseur...', true);
        });
    }, []);
    useEffect(() => {
        _setFormWithInvestorProfil();
    }, [investorStoredProfil]);
    function _setFormWithInvestorProfil() {
        if (investorStoredProfil) {
            formValues.annualRent = investorStoredProfil.annualRent;
            formValues.professionnalSalary = investorStoredProfil.professionnalSalary;
            formValues.actualCreditMensualities = investorStoredProfil.actualCreditMensualities;
            formValues.nbEstate = investorStoredProfil.nbEstate;
            setformValues(formValues);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar hideAriane={!isEditingApart} overrideBackPress={() => backPress()} previousRoute={(isEditingApart ? props.route.name : null)} route={(isEditingApart ? partShowed : props.route.name)} navigation={props.navigation}/>
            {!isEditingApart && <View style={[styles.flexCenter, {backgroundColor: appColors.white}]}>
                <Text category={"h6"} style={{fontWeight: "bold"}}>{convertRouteNameToLisible(props.route.name)}</Text>
                <Text style={{fontWeight: 'bold', color: appColors.dangerDark, fontSize: 11, textAlign: 'center', marginBottom: 10}}>Les champs marqués avec une étoile " * " sont obligatoires</Text>
            </View>}
            <Layout style={styles.fullScreen}>
                {!isEditingApart && <SimulatorMenu clickedMenu={(menuClicked) => _showForm(menuClicked)}/>}
                {partShowed === ESTATE && isEditingApart && <SimulatorEstateForm formValuesReturned={(datas) => fillDataFor(ESTATE, datas)} recoverredFormValues={formValues}/>}
                {partShowed === BANK && isEditingApart && <SimulatorBankForm formValuesReturned={(datas) => fillDataFor(BANK, datas)} recoverredFormValues={formValues}/>}
                {partShowed === FISCALITY && isEditingApart && <SimulatorFiscalityForm formValuesReturned={(datas) => fillDataFor(FISCALITY, datas)} recoverredFormValues={formValues}/>}
                {partShowed === RENT && isEditingApart && <SimulatorRentForm formValuesReturned={(datas) => fillDataFor(RENT, datas)} recoverredFormValues={formValues}/>}
                {partShowed === SITUATION && isEditingApart && <SimulatorSituationForm formValuesReturned={(datas) => fillDataFor(SITUATION, datas)} recoverredFormValues={formValues}/>}
                {!isEditingApart && <Icon.Button name="insert-chart"
                                                 backgroundColor={appColors.success}
                                                 onPress={() => runSimulator()}
                                                 style={{justifyContent: 'center'}}>
                    Lancer le simulateur
                </Icon.Button>}
                {!isEditingApart &&
                <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <BannerAd
                        onAdFailedToLoad={(error) => _bannerFailed(error)}
                        size={BannerAdSize.LARGE_BANNER}
                        unitId={BANNER_AD} />
                </View>
                }
            </Layout>
        </SafeAreaView>
    );

    /**
     * Display the corresponding sub form with the passed part
     * @param formToShow can be estate, fiscality or bank
     * @private
     */
    function _showForm(formToShow) {
        setisEditingApart(true);
        setpartShowed(formToShow)
    }

    /**
     * Override the headerbar back press to hide sub forms
     */
    function backPress() {
        if (isEditingApart) {
            setisEditingApart(false);
        } else {
            props.navigation.goBack();
        }
    }

    /**
     * Set data emitted by sub forms
     * @param formChanged the form which have been filled
     * @param datas the datas outputed by sub form
     */
    function fillDataFor(formChanged, datas) {
        switch (formChanged) {
            case ESTATE :
                _fillEstate(datas);
                break;
            case FISCALITY:
                _fillFiscality(datas);
                break;
            case BANK:
                _fillBank(datas);
                break;
            case RENT:
                _fillRent(datas);
                break;
            case SITUATION:
                _fillSituation(datas);
                break;
        }
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the estate form (buy price, notarial cost etc...)
     * @param datas the new data enterred in form
     * @private
     */
    function _fillEstate(datas) {
        backPress();
        formValues.noFai = datas.noFai;
        formValues.faiPercent = datas.faiPercent;
        formValues.notarialCost = datas.notarialCost;
        formValues.buyPrice = datas.buyPrice;
        formValues.surface = datas.surface;
        formValues.workCost = datas.workCost;
        formValues.secureSaving = datas.secureSaving;
        formValues.taxeFonciere = datas.taxeFonciere;
        formValues.city = datas.city;
        setformValues(formValues);
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the fiscality form (choosed fiscal type, insurances etc...)
     * @param datas the new data enterred in form
     * @private
     */
    function _fillFiscality(datas) {
        backPress();
        formValues.percentRentManagement = datas.percentRentManagement;
        formValues.inHandProject = datas.inHandProject;
        formValues.comptableCost = datas.comptableCost;
        formValues.pnoCost = datas.pnoCost;
        formValues.gliPercent = datas.gliPercent;
        formValues.vlInsurancePercent = datas.vlInsurancePercent;
        formValues.chargeCopro = datas.chargeCopro;
        formValues.previsionalRentCharge = datas.previsionalRentCharge;
        setformValues(formValues);
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the bank form all thing relative to a credit
     * @param datas the new data enterred in form
     * @private
     */
    function _fillBank(datas) {
        backPress();
        formValues.makeACredit = datas.makeACredit;
        formValues.is110 = datas.is110;
        formValues.apport = datas.apport;
        formValues.furnitureCost = datas.furnitureCost;
        formValues.includeFurnitureInCredit = datas.includeFurnitureInCredit;
        formValues.creditWarrantyCost = datas.creditWarrantyCost;
        formValues.bankCharges = datas.bankCharges;
        formValues.creditTime = datas.creditTime;
        formValues.bankRate = datas.bankRate;
        formValues.actualCreditMensualities = datas.actualCreditMensualities;
        setformValues(formValues);
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the rent form as fiscal type
     * @param datas the new data enterred in form
     * @private
     */
    function _fillRent(datas) {
        backPress();
        formValues.fiscalTypeId = datas.fiscalTypeId;
        formValues.monthlyRent = datas.monthlyRent;
        setformValues(formValues);
    }

    /**
     * Fill the state.formValues with the new datas for the simulation, Here is concerned the situation of the user
     * @param datas the new data enterred in form
     * @private
     */
    function _fillSituation(datas) {
        backPress();
        formValues.professionnalSalary = datas.professionnalSalary;
        formValues.annualRent = datas.annualRent;
        setformValues(formValues);
    }

    function _createInvestorProfil() {
        const profilInvest = new UserInvestorProfil(null,formValues.professionnalSalary, formValues.nbEstate,formValues.annualRent, 1,formValues.actualCreditMensualities);
        updateInvestorProfil(profilInvest);
    }

    /**
     * Send request to api to do the simulation with datas
     */
    function runSimulator() {
        const messageError = _checkFormValues();
        if (messageError === '') {
            if (!investorStoredProfil) {
                _createInvestorProfil();
            }
            simulatorService.calculateProject(formValues).then((response) => {
                props.navigation.navigate(ROUTE_SIMULATOR_RESULT, {
                    resultDatas: response,
                    cityPassed: formValues.city
                });
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
    function _checkFormValues() {
        let messageError = '';
        if (!formValues.buyPrice || !formValues.monthlyRent) {
            messageError = 'Partie "Bien à analyser" : \n';
            if (!formValues.buyPrice) {
                messageError = messageError + '- Prix requis \n';
            }
            if (!formValues.monthlyRent) {
                messageError = messageError + '- Loyer requis \n';
            }
        }
        if ((!formValues.buyPrice || !formValues.monthlyRent) && formValues.makeACredit) {
            messageError = messageError + 'Partie "Emprunt bancaire : " \n';
            if (!formValues.creditTime) {
                messageError = messageError + '- Durée du crédit requis \n';
            }
            if (!formValues.bankRate) {
                messageError = messageError + '- Taux d\'emprunt requis \n';
            }
        }
        return messageError;
    }

    function _bannerFailed(error) {
        console.log(error);
    }
}