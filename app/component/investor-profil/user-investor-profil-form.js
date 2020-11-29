import UserInvestorProfilService from "../../shared/services/entities/user-investor-profil-service";
import React, {useEffect, useState} from "react";
import UserInvestorProfil from "../../shared/models/user-investor-profil";
import * as yup from "yup";
import {Formik} from 'formik';
import {Button} from "@ui-kitten/components/ui/index";
import {View} from "react-native";
import SectionDivider from "../subcomponent/form/section-divider";
import {FormikField} from "../subcomponent/form/input-field";
import {styles} from "../../shared/styles/global";

export default function UserInvestorProfilForm() {
    const [userInvestorProfil, setUserInvestorProfil] = useState(new UserInvestorProfil(null,0,0,0,1,0));
    const userInvestorProfilService = new UserInvestorProfilService();
    const formik = {
        salary: userInvestorProfil.professionnalSalary,
        fiscalPart: userInvestorProfil.fiscalPart,
        nbEstate: userInvestorProfil.nbEstate,
        annualRent: userInvestorProfil.annualRent,
        actualCreditMensualities: userInvestorProfil.actualCreditMensualities
    };
    const _onSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
    };
    useEffect(() => {
        if (userInvestorProfil.id === null) {
            userInvestorProfilService.getCurrentUserInvestorProfil().then((userInvestorProfilRes) => {
                console.log(userInvestorProfilRes);
                if (userInvestorProfilRes && userInvestorProfilRes.id !== null) {
                    setUserInvestorProfil(userInvestorProfilRes)
                }
            });
        }
    }, [userInvestorProfil]);
    const numberTypeError = 'Ce champs doit être un nombre';
    return (
            <Formik
                initialValues={formik}
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
                            onTextChange={handleChange("salary")}
                            value={values.salary}
                            type={"number-pad"}
                            label={"Revenus professionnels"}
                            yupErrorMessage={errors.salary}
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