import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Text} from "@ui-kitten/components/ui/index";
import {appColors, styles} from "../../../shared/styles/global";
import SectionDivider from "../../subcomponent/form/section-divider";
import FillingBar from "../../subcomponent/filling-bar";
import TooltipsHelper from "../../subcomponent/ui-tools/tooltips-helper";
import BeInvestorAutoComplete from "../../subcomponent/autocomplete";
import {showToast} from "../../../shared/util/ui-helpers";
import GouvAdressService from "../../../shared/services/gouv-adresse-service";

export default function SimulatorProjectDetail({simulatorDatasReceived}) {
    const [pricem2, setPricem2] = useState(0);
    const [averageCitym2, setAverageCitym2] = useState(0);
    const [city, setCity] = useState(""); // the select city
    const [cities, setCities] = useState([]);
    const gouvAdressService = new GouvAdressService();
    useEffect(() => {
        const result = simulatorDatasReceived.simulatorDatas.totalProjectCost / simulatorDatasReceived.simulatorDatas.userEstate.surface;
        setPricem2(result);
    });
    useEffect(() => {
        // selected city will be send to back to recover m² price
        // set a "memoïsation" principle to cache city searched in current session
    }, [city]);
    return (
        <View style={styles.flexCenter}>
            <Text>Coût total de {simulatorDatasReceived.simulatorDatas.totalProjectCost.toString()} € pour un bien de {simulatorDatasReceived.simulatorDatas.userEstate.surface.toString()} m²</Text>
            <Text category={'h4'} >{pricem2} € / m²</Text>
            <BeInvestorAutoComplete
                autocompleteList={cities}
                onChoiceSelect={(item) => setCity(item)}
                onTxtChange={(text) => _onTxtChange(text)}
                placeholder={'Rechercher une ville'}/>
            <Text>Prix au m² sur {city.city} : {averageCitym2} € /m²</Text>
        </View>
    );

    function _onTxtChange(text) {
        if (text && text.trim() !== '' && text.trim().length > 2) {
            gouvAdressService.getAdressesCorresponding(text).then((results) => {
                setCities(results);
            }).catch((error) => {
                showToast('ERROR FROM GOUV API');
                console.error(error);
            })
        } else if (text === null) {
            setCities([])
        }
    }
}