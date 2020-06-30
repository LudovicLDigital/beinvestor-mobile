export const SimulatorReturnObject = {
    result: {
        rentaBrutte: null,
        rentaNet: null,
        cashflow: {
            cashflowBrut: null,
            cashflowNet: null,
            cashflowNetNet: null
        }
    },
    simulatorDatas: {
        userSimulatorSessionValues: {
            id: null,
            percentRentManagement: null,
            comptableCost: null,
            pnoCost: null,
            gliPercent: null,
            vlInsurancePercent: null
        },
        userEstate: {
            id: null,
            buyPrice: null,
            surface: null,
            workCost: null,
            furnitureCost: null,
            monthlyRent: null,
            secureSaving: null,
            previsionalRentCharge: null,
            taxeFonciere: null,
            chargeCopro: null,
            userInfoId: 1
        },
        bankStats: {
            id: null,
            is110: null,
            apport: null,
            creditWarrantyCost: null,
            bankCharges: null,
            creditTime: null,
            bankRate: null,
            creditDetail: {
                mensuality: null,
                totalInterest: null,
                totalBankInsuranceCost: null,
                mensualityWithInsurance: null,
                userEndettement: null
            }
        },
        fiscalType: {
            id: null,
            name: null,
            description: null,
        },
        totalProjectCost: null,
        totalCredit: null,
        agenceCharge: null,
        notarialCost: null,
        userInvestorProfil: {
            id: null,
            professionnalSalary: null,
            nbEstate: null,
            annualRent: null,
            actualCreditMensualities: null
        }
    },
    fiscality: {
        taxableRent: null,
        taxPS: null,
        taxIR: null,
        calculatedTMI: null,
        totalDeductiveCharges: {
            gliCost: null,
            annualRent: null,
            vlInsuranceCost: null,
            creditInsurance: null,
            secureCost: null,
            rentGestionCost: null
        },
        amortissementAmount: {
            for5Year: null,
            for10Year: null,
            for20YearAndMore: null,
            details: {
                furnitureAM: null,
                agenceChargeAM: null,
                notarialCostAM: null,
                bankAM: null,
                workAM: null,
                estateAM: null
            }
        }
    }
};
export const SimulatorDataSendObject = {
    noFai: false,
    makeACredit: true,
    includeFurnitureInCredit: true,
    faiPercent: null,
    notarialCost: null,

    buyPrice: null,
    surface: null,
    workCost: null,
    furnitureCost: null,
    monthlyRent: null,
    secureSaving: null,
    taxeFonciere: null,
    previsionalRentCharge: null,
    chargeCopro: null,

    is110: true,
    apport: null,
    creditWarrantyCost: null,
    bankCharges: null,
    creditTime: null,
    bankRate: null,

    percentRentManagement: null,
    comptableCost: null,
    pnoCost: null,
    gliPercent: null,
    vlInsurancePercent: null,

    fiscalTypeId: 1,

    professionnalSalary: 0,
    nbEstate : 0,
    actualCreditMensualities: 0,
    annualRent: 0
};