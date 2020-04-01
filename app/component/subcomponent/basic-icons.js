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