import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Text} from "@ui-kitten/components/ui/index";
import {appColors, styles} from "../../../shared/styles/global";
import BeInvestorAutoComplete from "../../subcomponent/autocomplete";
import {showToast} from "../../../shared/util/ui-helpers";
import GouvAdressService from "../../../shared/services/gouv-adresse-service";
import CityService from "../../../shared/services/entities/city-service";

export default function SimulatorProjectDetail({simulatorDatasReceived}) {
    const [pricem2, setPricem2] = useState(0);
    const [averageCitym2, setAverageCitym2] = useState(0);
    const [city, setCity] = useState(""); // the select city
    const [cities, setCities] = useState([]);
    const [priceIndicatorColor, setPriceIndicatorColor] = useState(appColors.dark);
    const gouvAdressService = new GouvAdressService();
    const cityService = new CityService();
    useEffect(() => {
        const result = simulatorDatasReceived.simulatorDatas.totalProjectCost / simulatorDatasReceived.simulatorDatas.userEstate.surface;
        setPricem2(result);
    });
    useEffect(() => {
        // selected city will be send to back to recover m² price
        cityService.getCityAveragePriceM2(city.cityCode).then((averagePrice) => {
            setAverageCitym2(averagePrice);
            if (averagePrice >= pricem2) {
                setPriceIndicatorColor(appColors.success);
            } else {
                setPriceIndicatorColor(appColors.danger);
            }
        }).catch((error) => {
            console.error(error);
            showToast('Impossible de récuperer le prix au m² de cette ville');
        })
    }, [city.cityCode]);
    return (
        <View style={styles.flexCenter}>
            {simulatorDatasReceived.simulatorDatas.userEstate.surface && simulatorDatasReceived.simulatorDatas.userEstate.surface > 0 ?
                <View  style={styles.flexCenter}>
                    <Text>Coût total de {simulatorDatasReceived.simulatorDatas.totalProjectCost.toString()} € pour un
                        bien de {simulatorDatasReceived.simulatorDatas.userEstate.surface.toString()} m²</Text>
                    <Text category={'h4'} style={{color: priceIndicatorColor}}>{pricem2.toFixed(2)} € / m²</Text>
                </View>
                :
                <View>
                    <Text>Pour connaitre le prix au m² en € de votre bien, ajoutez la surface en m² de ce dernier</Text>
                </View>
            }
            <BeInvestorAutoComplete
                autocompleteList={cities}
                onChoiceSelect={(item) => setCity(item)}
                onTxtChange={(text) => _onTxtChange(text)}
                placeholder={'Rechercher une ville'}/>
            <Text style={{fontSize: 12}}>Prix au m² sur {city ? city.city : '...'} : {averageCitym2 ? averageCitym2 : '...'} € /m²</Text>
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