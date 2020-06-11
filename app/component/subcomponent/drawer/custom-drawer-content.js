import React, {Fragment, useEffect} from 'react';
import {convertRouteNameToLisible} from "../../../shared/util/converter-for-route-name";
import {
    BANNER_AD,
    ROUTE_FAV_GRP,
    ROUTE_INFO,
    ROUTE_LOGIN,
    ROUTE_MAP,
    ROUTE_SEARCH_GRP,
    ROUTE_SETTING,
    ROUTE_SIMULATOR,
    ROUTE_USER_PROFIL
} from "../../../shared/util/constants";
import {DrawerContentScrollView,} from '@react-navigation/drawer';
import AuthService from "../../../shared/services/auth";
import {Alert, BackHandler, View} from "react-native";
import MenuItem from "./MenuItem";
import HeaderUser from "../header-user";
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
const drawerMenuItems = [
    {
        title: convertRouteNameToLisible(ROUTE_MAP),
        icon: 'globe-2-outline',
        route: ROUTE_MAP
    },
    {
        title: convertRouteNameToLisible(ROUTE_SIMULATOR),
        icon: 'pie-chart-2',
        route: ROUTE_SIMULATOR
    },
    {
        title: convertRouteNameToLisible(ROUTE_USER_PROFIL),
        icon: 'person-outline',
        route: ROUTE_USER_PROFIL
    },
    {
        title: convertRouteNameToLisible(ROUTE_SEARCH_GRP),
        icon: 'search-outline',
        route: ROUTE_SEARCH_GRP
    },
    {
        title: convertRouteNameToLisible(ROUTE_FAV_GRP),
        icon: 'heart',
        route: ROUTE_FAV_GRP
    },
    {
        title: convertRouteNameToLisible(ROUTE_SETTING),
        icon: 'options-2-outline',
        route: ROUTE_SETTING
    },
    {
        title: convertRouteNameToLisible(ROUTE_INFO),
        icon: 'info-outline',
        route: ROUTE_INFO
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
export const CustomDrawerContent = (props) => { //{ navigation, state }
    useEffect(() => {
        const backAction = () =>
        {
            if (props.state.routeNames[props.state.index] === ROUTE_MAP) {
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
    const LOGOUT = 'logout';
    const onSelect = (route) => {
        if (route === ROUTE_FAV_GRP) {
            props.navigation.navigate(route, { screen: ROUTE_FAV_GRP, params: {isFavRoute: true}});
        } else if(route === LOGOUT) {
            logout(props.navigation);
        }
        else{
            props.navigation.navigate(route);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            <HeaderUser/>
            {drawerMenuItems.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <MenuItem label={item.title} icon={item.icon} isFocused={props.state.index -1 === index} onSelect={() => onSelect(item.route)}/>
                    </Fragment>
                )
            })}
            <MenuItem label={'Se déconnecter'} icon={'log-out'} onSelect={() => onSelect(LOGOUT)}/>
            <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 25}}>
                <BannerAd  size={BannerAdSize.SMART_BANNER} unitId={BANNER_AD} />
            </View>
        </DrawerContentScrollView>
    );
};