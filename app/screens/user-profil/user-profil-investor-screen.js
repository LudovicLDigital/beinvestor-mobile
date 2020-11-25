import React, {useState, useEffect} from 'react';
import {styles} from "../../shared/styles/global";
import {SafeAreaView, TextInput, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import UserInvestorProfil from "../../shared/models/user-investor-profil";
import UserInvestorProfilService from "../../shared/services/entities/user-investor-profil-service";
import SectionDivider from "../../component/subcomponent/form/section-divider";
import { Formik, Form, Field, ErrorMessage, useFormik  } from 'formik';
import InputField from "../../component/subcomponent/form/input-field";
import {Button, Input} from "@ui-kitten/components/ui/index";

export default function UserProfilInvestorScreen(props) {
    const [userInvestorProfil, setUserInvestorProfil] = useState(new UserInvestorProfil(null,0,0,0,1,0));
    const userInvestorProfilService = new UserInvestorProfilService();
    const formik = {
        initialValues: {
            salary: userInvestorProfil.professionnalSalary,
            fiscalPart: userInvestorProfil.fiscalPart,
            nbEstate: userInvestorProfil.nbEstate,
            annualRent: userInvestorProfil.annualRent,
            actualCreditMensualities: userInvestorProfil.actualCreditMensualities
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar route={props.route.name} navigation={props.navigation}/>
            <Formik
                initialValues={formik.initialValues}
                onSubmit={values => formik.onSubmit(values)} >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={{flex: 1}}>
                        <SectionDivider sectionName={'Profil investisseur'}/>
                        <TextInput
                            onChange={handleChange("salary")}
                            onBlur={handleBlur("salary")}
                            value={values.salary}
                        />
                        <SectionDivider sectionName={'Bien immobiliers'}/>
                        <SectionDivider sectionName={'Détails des biens'}/>

                        <Button onPress={handleSubmit}>Submit</Button>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
}