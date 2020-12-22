import UserInvestorProfilService from "../../shared/services/entities/user-investor-profil-service";
import React, {useEffect, useState} from "react";
import { useStoreActions, useStoreState } from 'easy-peasy';
import UserInvestorProfil from "../../shared/models/user-investor-profil";
import * as yup from "yup";
import {Formik} from 'formik';
import {Button} from "@ui-kitten/components/ui/index";
import {View} from "react-native";
import SectionDivider from "../subcomponent/form/section-divider";
import {FormikField} from "../subcomponent/form/input-field";
import {styles} from "../../shared/styles/global";
import {showInfoAlert, showToast} from "../../shared/util/ui-helpers";

export default function UserInvestorProfilForm() {
    let investorStoredProfil = useStoreState((state) => state.userInvestorProfil);
    const {setUserInvestorProfil, updateInvestorProfil} = useStoreActions((actions) => ({
        setUserInvestorProfil: actions.setInvestorProfil,
        updateInvestorProfil: actions.updateInvestorProfil }));
    const _onSubmit = (values) => {
        updateInvestorProfil(values);
        showToast('Changements sauvegardés');
    };
    useEffect(() => {
        if (!investorStoredProfil) {
            setUserInvestorProfil(new UserInvestorProfil(null,0,0,0,1,0));
        }
    }, []);
    const numberTypeError = 'Ce champs doit être un nombre';
    return (
        <Formik
            initialValues={{
                professionnalSalary: (investorStoredProfil && investorStoredProfil !== null) ? investorStoredProfil.professionnalSalary?.toString() : 0,
                fiscalPart: (investorStoredProfil && investorStoredProfil !== null) ? investorStoredProfil.fiscalPart?.toString() : 1,
                nbEstate: (investorStoredProfil && investorStoredProfil !== null) ? investorStoredProfil.nbEstate?.toString() : 0,
                annualRent: (investorStoredProfil && investorStoredProfil !== null) ? investorStoredProfil.annualRent?.toString() : 0,
                actualCreditMensualities: (investorStoredProfil && investorStoredProfil !== null) ? investorStoredProfil.actualCreditMensualities?.toString() : 0
            }}
            enableReinitialize={true}
            onSubmit={values => _onSubmit(values)}
            validationSchema={yup.object().shape({
                salary: yup
                    .number()
                    .typeError(numberTypeError)
                    .min(0, "Vous ne pouvez pas avoir des revenus négatifs"),
                fiscalPart: yup
                    .number()
                    .typeError(numberTypeError)
                    .min(1, "Il y a au minimum 1 part fiscal par foyer (vous)"),
                nbEstate: yup
                    .number()
                    .typeError(numberTypeError)
                    .min(0, "Vous ne pouvez pas renseigner ici un nombre négatif"),
                annualRent: yup
                    .number()
                    .typeError(numberTypeError),
                actualCreditMensualities: yup
                    .number()
                    .typeError(numberTypeError)
                    .min(0, "Vos mensualités actuelles ne peuvent pas être négatives")
            })}
        >
            {({ values, handleChange, handleBlur, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <View style={{flex: 1}}>
                    <SectionDivider sectionName={'Profil investisseur'}/>
                    <FormikField
                        onTextChange={handleChange("professionnalSalary")}
                        value={values.professionnalSalary}
                        type={"number-pad"}
                        label={"Salaire professionnel annuel (€)"}
                        yupErrorMessage={errors.professionnalSalary}
                    />
                    <FormikField
                        onTextChange={handleChange("fiscalPart")}
                        value={values.fiscalPart}
                        type={"number-pad"}
                        label={"Parts fiscal"}
                        yupErrorMessage={errors.fiscalPart}
                    />
                    <FormikField
                        onTextChange={handleChange("actualCreditMensualities")}
                        value={values.actualCreditMensualities}
                        type={"number-pad"}
                        label={"Mensualité de crédit actuelle"}
                        yupErrorMessage={errors.actualCreditMensualities}
                    />
                    <SectionDivider sectionName={'Bien immobiliers'}/>
                    <FormikField
                        onTextChange={handleChange("nbEstate")}
                        value={values.nbEstate}
                        type={"number-pad"}
                        label={"Nombre de biens immobilier"}
                        yupErrorMessage={errors.nbEstate}
                    />
                    <FormikField
                        onTextChange={handleChange("annualRent")}
                        value={values.annualRent}
                        type={"number-pad"}
                        label={"Revenu locatif annuel"}
                        yupErrorMessage={errors.annualRent}
                    />
                    <Button
                        status={"success"}
                        disabled={!isValid}
                        onPress={handleSubmit}>Sauvegarder</Button>
                </View>
            )}
        </Formik>
    );
}