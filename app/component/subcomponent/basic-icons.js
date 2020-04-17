import React  from 'react';
import {  Icon } from '@ui-kitten/components';
import {appColors} from "../../shared/styles/global";

export const BackIcon = (style) => (
    <Icon {...style}  name='arrow-back'/>
);
export const MenuIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='menu'/>
);
export const SimulatorIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='pie-chart-2'/>
);
export const LogoutIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='log-out'/>
);
export const PersonIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='person-outline'/>
);
export const GlobeIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='globe-2-outline'/>
);
export const FavIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='heart'/>
);
export const InfoIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='info-outline'/>
);
export const SettingsIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='options-2-outline'/>
);
export const SearchIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='search-outline' />
);
export const MembersIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='people-outline' />
);
export const CloseCircleIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='close-circle-outline' />
);
export const SharedFilesIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='layers-outline' />
);
export const NotificationIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='bell-outline' />
);
export const AddIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='plus' />
);
export const SendIcon = (style) => (
    <Icon {...style} fill={appColors.primary}  name='paper-plane' />
);
export const PositionIcon = (style) => (
    <Icon {...style} fill={appColors.primary} name='pin-outline' />
);