import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import { SafeAreaView, View} from 'react-native';
import { Text, Layout} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SimulatorMenu from "../../component/simulator/simulator-menu";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BANK, ESTATE, FISCALITY, ROUTE_SIMULATOR_RESULT} from "../../shared/util/constants";
import SimulatorEstateForm from "../../component/simulator/simulator-estate-form";
import SimulatorFiscalityForm from "../../component/simulator/simulator-fiscality-form";
import SimulatorBankForm from "../../component/simulator/simulator-bank-form";
import {SimulatorDataSendObject, SimulatorReturnObject} from "../../shared/util/simulator-objects";
import SimulatorService from "../../shared/services/simulator-service";
export default class SimulatorScreen extends Component {
    simulatorService;
    constructor(props) {
        super(props);
        this.simulatorService = new SimulatorService();
        this.state = {
            isEditingApart: false,
            partShowed: null,
            formValues: SimulatorDataSendObject,
        }
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar overrideBackPress={() => this.backPress()} previousRoute={(this.state.isEditingApart ? this.props.route.name : null)} route={(this.state.isEditingApart ? this.state.partShowed : this.props.route.name)} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    {!this.state.isEditingApart && <SimulatorMenu clickedMenu={(menuClicked) => this._showForm(menuClicked)}/>}
                    {this.state.partShowed === ESTATE && this.state.isEditingApart && <SimulatorEstateForm formValuesReturned={(datas) => this.fillDataFor(ESTATE, datas)} recoverredFormValues={this.state.formValues}/>}
                    {this.state.partShowed === BANK && this.state.isEditingApart && <SimulatorBankForm formValuesReturned={(datas) => this.fillDataFor(BANK, datas)} recoverredFormValues={this.state.formValues}/>}
                    {this.state.partShowed === FISCALITY && this.state.isEditingApart && <SimulatorFiscalityForm formValuesReturned={(datas) => this.fillDataFor(FISCALITY, datas)} recoverredFormValues={this.state.formValues}/>}
                    {!this.state.isEditingApart && <Icon.Button name="insert-chart"
                                 backgroundColor={appColors.success}
                                 onPress={() => this.runSimulator()}
                                 style={{justifyContent: 'center'}}>
                        Évaluer mon projet
                    </Icon.Button>}
                </Layout>
            </SafeAreaView>
        );
    }
    _showForm(formToShow) {
        this.setState({isEditingApart: true, partShowed: formToShow})
    }

    backPress() {
        if (this.state.isEditingApart) {
            this.setState({isEditingApart: false});
        } else {
            this.props.navigation.goBack();
        }
    }

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
        }
    }
    _fillEstate(datas) {
        this.backPress();
        this.state.formValues.noFai = datas.noFai;
        this.state.formValues.faiPercent = datas.faiPercent;
        this.state.formValues.notarialCost = datas.notarialCost;
        this.state.formValues.buyPrice = datas.buyPrice;
        this.state.formValues.surface = datas.surface;
        this.state.formValues.workCost = datas.workCost;
        this.state.formValues.monthlyRent = datas.monthlyRent;
        this.state.formValues.secureSaving = datas.secureSaving;
        this.state.formValues.taxeFonciere = datas.taxeFonciere;
        this.state.formValues.previsionalRentCharge = datas.previsionalRentCharge;
        this.state.formValues.chargeCopro = datas.chargeCopro;
    }
    _fillFiscality(datas) {
        this.backPress();
        this.state.formValues.percentRentManagement = datas.percentRentManagement;
        this.state.formValues.inHandProject = datas.inHandProject;
        this.state.formValues.comptableCost = datas.comptableCost;
        this.state.formValues.pnoCost = datas.pnoCost;
        this.state.formValues.gliPercent = datas.gliPercent;
        this.state.formValues.vlInsurancePercent = datas.vlInsurancePercent;
        this.state.formValues.fiscalTypeId = datas.fiscalTypeId;
        this.state.formValues.professionnalSalary = datas.professionnalSalary;
        this.state.formValues.annualRent = datas.annualRent;
    }
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

    runSimulator() {
        this.simulatorService.calculateProject(this.state.formValues).then((response) => {
            this.props.navigation.navigate(ROUTE_SIMULATOR_RESULT, {resultDatas: response});
        }).catch((error) => {
            console.error('ERROR TO calculateProject : ');
            console.error(error);
        })
    }
}