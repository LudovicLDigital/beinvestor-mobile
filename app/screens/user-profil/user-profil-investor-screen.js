import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import HeaderBar from '../../component/subcomponent/header-bar';
import UserInvestorProfilForm from "../../component/investor-profil/user-investor-profil-form";
import {styles} from "../../shared/styles/global";
import InvestorProfilEstate from "../../component/investor-profil/investor-profil-estate";

export default function UserProfilInvestorScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar route={props.route.name} navigation={props.navigation}/>
            <ScrollView contentContainerStyle={{paddingBottom: 20}} style={[styles.fullScreen ]}>
                <UserInvestorProfilForm/>
                <InvestorProfilEstate/>
            </ScrollView>
        </SafeAreaView>
    );
}