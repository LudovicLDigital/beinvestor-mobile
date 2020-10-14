import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {appColors, styles} from "../../../shared/styles/global";
import SectionDivider from "../../subcomponent/form/section-divider";
import FillingBar from "../../subcomponent/filling-bar";
import TooltipsHelper from "../../subcomponent/ui-tools/tooltips-helper";

export default function SimulatorProjectDetail({simulatorDatasReceived}) {
    const [pricem2, setPricem2] = useState(0);
    console.log('DEBUG ======= simulatorDatasReceived totalProjectCost');
    console.log(simulatorDatasReceived.totalProjectCost);
    useEffect(() => {
        setPricem2(simulatorDatasReceived.totalProjectCost / simulatorDatasReceived.userEstate.surface);
    });
    return (
        <View>
            <Text>Coût total de {simulatorDatasReceived.totalProjectCost.toString()} €</Text>
            <Text>pour un bien de {simulatorDatasReceived.userEstate.surface.toString()} m²</Text>
            <Text>Soit :</Text>
            <Text>{pricem2}</Text>
        </View>
    )
}