import React, {Component} from "react";
import {View} from "react-native";
import {Text} from "@ui-kitten/components/ui/index";
import {appColors, styles} from "../../../shared/styles/global";
import SectionDivider from "../../subcomponent/form/section-divider";
import FillingBar from "../../subcomponent/filling-bar";
import {VictoryPie} from "victory-native";
import TooltipsHelper from "../../subcomponent/tooltips-helper";

const graphicColor = [appColors.primaryDark, '#3ACCE1', appColors.primary, appColors.secondary];

/**
 * PROPS :
 * - simulatorDatasReceived : the datas of the simulator
 * - containerStyle: style for the main Container
 */
export default class SimulatorCreditDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simData: this.props.simulatorDatasReceived,
            capitalized: 0,
            interest: 0,
            insurance: 0,
            graphicData: [{ y: 0 }, { y: 0 }, {y: 0}, { y: 100 }]
        };
    }

    componentDidMount(): void {
        this._setMensualityDetail();
        this._setEndettementChart();
    }
    _setMensualityDetail() {
        const montlyInterest = (this.state.simData.simulatorDatas.bankStats.creditDetail.totalInterest / this.state.simData.simulatorDatas.bankStats.creditTime) / 12;
        const montlyInsurance = (this.state.simData.simulatorDatas.bankStats.creditDetail.totalBankInsuranceCost / this.state.simData.simulatorDatas.bankStats.creditTime) / 12;
        const montlyCapitalized = this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance - montlyInsurance - montlyInterest;
        this.setState({
            capitalized: Math.round(montlyCapitalized*100)/100,
            interest: Math.round(montlyInterest*100)/100,
            insurance: Math.round(montlyInsurance*100)/100,
        })
    }
    _setEndettementChart() {
        const graphicData = [
            {
                x: `${this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance}€\n mensualité \n du projet`,
                y: this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance},
            {
                x: `${Math.round(this.state.simData.simulatorDatas.userEstate.monthlyRent * 0.7)}€\n(70%)\nrevenus\n locatif `,
                y: Math.round(this.state.simData.simulatorDatas.userEstate.monthlyRent * 0.7)}
        ];
        if (this.state.simData.simulatorDatas.userInvestorProfil.actualCreditMensualities && this.state.simData.simulatorDatas.userInvestorProfil.actualCreditMensualities > 0) {
            graphicData.push({
                x: `${this.state.simData.simulatorDatas.userInvestorProfil.actualCreditMensualities}€\n autres\n crédits`,
                y: this.state.simData.simulatorDatas.userInvestorProfil.actualCreditMensualities})
        }
        if (this.state.simData.simulatorDatas.userInvestorProfil.professionnalSalary && this.state.simData.simulatorDatas.userInvestorProfil.professionnalSalary > 0) {
            graphicData.push({
                x: `${Math.round((this.state.simData.simulatorDatas.userInvestorProfil.professionnalSalary/12)*100)/100}€\nrevenus\npro`,
                y: this.state.simData.simulatorDatas.userInvestorProfil.professionnalSalary/12})
        }
        this.setState({
            graphicData: graphicData.reverse()
        });

    }
    render() {
        return (
            <View style={{flex:1, alignItems: 'center'}}>
                <Text>Sur {this.state.simData.simulatorDatas.bankStats.creditTime} ans ({this.state.simData.simulatorDatas.bankStats.creditTime * 12} mois)
                    d'un total de {this.state.simData.simulatorDatas.totalCredit}€
                    {this.state.simData.simulatorDatas.bankStats.is110 ? ' à 110% ': `avec un apport de ${this.state.simData.simulatorDatas.bankStats.apport}€ `}
                    au taux de {Math.round(this.state.simData.simulatorDatas.bankStats.bankRate*10000)/100}%</Text>
                <Text category={'h5'} style={{fontWeight: 'bold', textAlign: 'center'}}>Mensualité de {this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance}€</Text>
                {this.state.simData &&
                <View style={[{flex: 1, alignItems: 'flex-start'}]}>
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Amortissement du capital : ${this.state.capitalized}€`}
                            fillingCoef={this.state.capitalized}
                            maxFill={this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance}
                            fillingColor={'#fffe1f'}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'L\'amortissement du capital est le montant réel que vous remboursez de votre emprunt (le capital emprunté) chaque mois.'}/>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Intérêt d'emprunt : ${this.state.interest}€`}
                            fillingCoef={this.state.interest}
                            maxFill={this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance}
                            fillingColor={'#3ACCE1'}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'Chaque mensualité comprends des intérêts que vous devez payer au près de la banque qui vous a prêté une somme d\'argent'}/>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <FillingBar
                            containerStyle={{marginTop: 15}}
                            title={`Assurance emprunteur: ${this.state.insurance}€`}
                            fillingCoef={this.state.insurance}
                            maxFill={this.state.simData.simulatorDatas.bankStats.creditDetail.mensualityWithInsurance}
                            fillingColor={'#3497FD'}/>
                        <TooltipsHelper showAsAlert={true}  messageInfo={'Ce montant est calculé grâce au montant moyen du marché actuel. La souscription à une assurance emprunteur est obligatoire lorsque vous faites un emprunt, le montant est déterminé selon votre profil et les risques existante (maladies etc...)'}/>
                    </View>

                </View>}
                <SectionDivider sectionName={'Détails de l\'endettement'} containerStyle={{marginTop: 10, marginBottom: 10}}/>
                {(this.state.simData.simulatorDatas.userInvestorProfil.professionnalSalary && this.state.simData.simulatorDatas.userInvestorProfil.professionnalSalary > 0 )
                    ?
                    <View style={{flex:1, alignItems: 'center'}}>
                        <View style={{position: 'absolute', right: 0, zIndex: 1000}}>
                            <TooltipsHelper showAsAlert={true}  messageInfo={'70% des revenus sont généralement pris en compte par les banques dans le calcul d\'endettement pour compenser les charges, ce montant peut varier entre les banques'}/>
                        </View>
                        <VictoryPie animate={{ duration: 2000, easing: 'exp' }}
                                    data={this.state.graphicData}
                                    style={{labels: {fontSize: 9, fontWeight: "bold", padding: 10}}}
                                    width={250}
                                    height={250}
                                    colorScale={graphicColor}
                                    innerRadius={60}
                        />
                        <View style={[styles.flexCenter,  {position: "absolute", top: '40%', zIndex: 900}]}>
                            <Text style={[{fontWeight: "bold", fontSize: 25}]}>{this.state.simData.simulatorDatas.bankStats.creditDetail.userEndettement}%</Text>
                            <Text style={[{color: appColors.secondaryLight, fontSize: 12}]}>Endettement</Text>
                        </View>
                    </View>
                    : <Text>Indisponible car vous n'avez pas renseigné vos revenus dans l'étape "Fiscalité"</Text>
                }
            </View>
        )
    }

}