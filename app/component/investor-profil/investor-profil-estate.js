import React from "react";
import SectionDivider from "../subcomponent/form/section-divider";
import {View} from "react-native";
import {Text} from '@ui-kitten/components';

export default function InvestorProfilEstate() {
    return (
        <View>
            <SectionDivider sectionName={'Détails des biens'}/>
            <Text>Vous pourrez ajouter des détails sur les biens que vous possédez ici. Vous pourrez même sauvegarder ceux pour lesquels vous avez réalisé des simulations et les recharger dans le simulateur ! 🔥</Text>
        </View>
    )
}