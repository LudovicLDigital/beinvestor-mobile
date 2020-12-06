import React, {Component, useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {appColors, styles} from "../../shared/styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputField, {FormikField} from "../subcomponent/form/input-field";
import SectionDivider from "../subcomponent/form/section-divider";
import { useStoreState } from 'easy-peasy';
import * as yup from "yup";
import {Formik} from 'formik';

/**
 * PROPS :
 * - formValuesReturned : method sending data enterred in the form
 * - recoverredFormValues : préinputed values for the form
 */
export default function SimulatorSituationForm({props, recoverredFormValues, formValuesReturned}) {
    const investorStoredProfil = useStoreState((state) => state.userInvestorProfil);
    const [professionnalSalary, setSalary] = useState(recoverredFormValues.professionnalSalary);
    const [annualRent, setAnnualRent] = useState(recoverredFormValues.professionnalSalary);
    useEffect(() => {
        if (!recoverredFormValues) {
            setSalary(investorStoredProfil.professionnalSalary);
            setAnnualRent(investorStoredProfil.annualRent);
        } else {
            setSalary(recoverredFormValues.professionnalSalary);
            setAnnualRent(recoverredFormValues.annualRent);
        }
    }, []);

    const formik = {
        professionnalSalary: professionnalSalary ? professionnalSalary : '0',
        annualRent: annualRent ? annualRent : '0',
    };
    const _onSubmit = (values) => {
        formValuesReturned(values);
        alert(JSON.stringify(values, null, 2));
    };
    const numberTypeError = 'Ce champs doit être un nombre';
    return (
        <>
            <Formik
                initialValues={formik}
                onSubmit={values => _onSubmit(values)}
                validationSchema={yup.object().shape({
                    professionnalSalary: yup
                        .number()
                        .typeError(numberTypeError)
                        .min(0, "Vous ne pouvez pas avoir des revenus négatifs"),
                    annualRent: yup
                        .number()
                        .typeError(numberTypeError)
                })}
            >
                {({ values, handleChange, handleBlur, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[{flex: 1}]}>
                            <SectionDivider sectionName={'Votre situation'}/>
                            <View style={styles.flexRowAlignCenter}>
                                <FormikField
                                    onTextChange={handleChange("professionnalSalary")}
                                    value={values.professionnalSalary}
                                    style={{marginRight: 15}}
                                    type={"number-pad"}
                                    label={"Salaire professionnel annuel (€)"}
                                    yupErrorMessage={errors.professionnalSalary}
                                />
                            </View>
                            <View style={styles.flexRowAlignCenter}>
                                <FormikField
                                    onTextChange={handleChange("annualRent")}
                                    value={values.annualRent}
                                    style={{marginRight: 15}}
                                    type={"number-pad"}
                                    label={"Autre revenus (€)"}
                                    yupErrorMessage={errors.annualRent}
                                />
                            </View>
                        </ScrollView>
                        <Icon.Button name="save"
                                     disabled={!isValid}
                                     backgroundColor={appColors.success}
                                     onPress={handleSubmit}
                                     style={{justifyContent: 'center'}}>
                            Sauvegarder
                        </Icon.Button>
                    </>
                )}
            </Formik>
        </>
    )
}