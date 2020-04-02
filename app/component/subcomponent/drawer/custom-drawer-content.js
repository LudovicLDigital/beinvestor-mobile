
import React from 'react';
import {Colors} from "react-native/Libraries/NewAppScreen/index";
import { Drawer as UIKittenDrawer,DrawerHeaderFooter,Button } from '@ui-kitten/components';
import {FavIcon, GlobeIcon, InfoIcon, LogoutIcon, PersonIcon, SettingsIcon, SimulatorIcon} from "../basic-icons";
const drawerMenuItems = [
    {
        title: 'Carte',
        icon: GlobeIcon
    },
    {
        title: 'Simulateur immobilier',
        icon: SimulatorIcon
    },
    {
        title: 'Mon profil',
        icon: PersonIcon
    },
    {
        title: 'Mes groupes favoris',
        icon: FavIcon
    },
    {
        title: 'Paramètres',
        icon: SettingsIcon
    },
    {
        title: 'A propos de BeInvestor',
        icon: InfoIcon
    },
];
const LogoutButton = (style) => (
    <Button style={[{...style}, {backgroundColor: Colors.white}]} icon={LogoutIcon}/>
);
const Footer = () => (
    <DrawerHeaderFooter accessory={LogoutButton} description='Se déconnecter'/>
);
export const CustomDrawerContent = ({ navigation, state }) => {

    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <UIKittenDrawer
            data={drawerMenuItems}
            footer={Footer}
            selectedIndex={state.index}
            onSelect={onSelect}
        />
    );
};