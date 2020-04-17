
import React, { useEffect } from 'react';
import { Drawer as UIKittenDrawer,DrawerHeaderFooter,Button } from '@ui-kitten/components';
import {
    FavIcon,
    GlobeIcon,
    InfoIcon,
    LogoutIcon,
    PersonIcon,
    SearchIcon,
    SettingsIcon,
    SimulatorIcon
} from "../basic-icons";
import {convertRouteNameToLisible} from "../../../shared/util/converter-for-route-name";
import {
    ROUTE_FAV_GRP,
    ROUTE_INFO,
    ROUTE_LOGIN,
    ROUTE_MAP,
    ROUTE_SEARCH_GRP,
    ROUTE_SETTING,
    ROUTE_SIMULATOR,
    ROUTE_USER_PROFIL
} from "../../../shared/util/constants";
import AuthService from "../../../shared/services/auth";
import {Alert, BackHandler} from "react-native";
import {appColors} from "../../../shared/styles/global";

const drawerMenuItems = [
    {
        title: convertRouteNameToLisible(ROUTE_MAP),
        icon: GlobeIcon
    },
    {
        title: convertRouteNameToLisible(ROUTE_SIMULATOR),
        icon: SimulatorIcon
    },
    {
        title: convertRouteNameToLisible(ROUTE_USER_PROFIL),
        icon: PersonIcon
    },
    {
        title: convertRouteNameToLisible(ROUTE_SEARCH_GRP),
        icon: SearchIcon
    },
    {
        title: convertRouteNameToLisible(ROUTE_FAV_GRP),
        icon: FavIcon
    },
    {
        title: convertRouteNameToLisible(ROUTE_SETTING),
        icon: SettingsIcon
    },
    {
        title: convertRouteNameToLisible(ROUTE_INFO),
        icon: InfoIcon
    },
];
function logout(navigation) {
    Alert.alert(
        "Vous voulez vous déconnecter ?",
        "Cliquer sur Oui vous renverra à l'écran de connexion",
        [
            {
                text: 'Annuler',
                onPress: () => {}
            },
            {
                text: 'Oui',
                onPress: () => {
                    AuthService.logout().then((isDisconnected) => {
                        if(isDisconnected) {
                            navigation.navigate(ROUTE_LOGIN);
                        }
                    }).catch((error) => {
                        console.log('ERROR WHEN LOGOUT');
                        console.log(error);
                    })
                }
            }
        ]
    )
}
const LogoutButton = (style) => (
    <Button style={[{...style}, {backgroundColor: appColors.white}]} icon={LogoutIcon}/>
);
const Footer = (navigation) => (
    <DrawerHeaderFooter onPress={() => logout(navigation)} accessory={LogoutButton} description='Se déconnecter'/>
);
export const CustomDrawerContent = ({ navigation, state }) => {
    useEffect(() => {
        const backAction = () =>
        {
            if (state.routeNames[state.index] === ROUTE_MAP) {
                Alert.alert(
                    "Attention ! ",
                    "Voulez vous quitter l'application ?",
                    [
                        {
                            text: "Non",
                            onPress: () => null
                        },
                        {text: "Oui", onPress: () => BackHandler.exitApp()}
                    ]);
                return true;
            } else {
                return false;
            }
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);

        return () => backHandler.remove();
    });
    const onSelect = (index) => {
        if (state.routeNames[index] === ROUTE_FAV_GRP) {
            navigation.navigate(state.routeNames[index], { screen: ROUTE_FAV_GRP, params: {isFavRoute: true}});
        } else {
            navigation.navigate(state.routeNames[index]);
        }
    };

    return (
        <UIKittenDrawer
            data={drawerMenuItems}
            footer={() => Footer(navigation)}
            selectedIndex={state.index}
            onSelect={onSelect}
        />
    );
};