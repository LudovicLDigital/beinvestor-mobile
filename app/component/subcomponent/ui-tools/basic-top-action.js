import React from 'react';
import {TopNavigationAction} from '@ui-kitten/components';
import {BackIcon, MenuIcon, SimulatorIcon} from "./basic-icons";

export const MenuAction = (props) => (
    <TopNavigationAction {...props} icon={MenuIcon}/>
);
export const BackAction = (props) => (
    <TopNavigationAction {...props} icon={BackIcon}/>
);
export const SimulatorAction = (props) => (
    <TopNavigationAction {...props} icon={SimulatorIcon}/>
);