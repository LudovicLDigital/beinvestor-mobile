import React, { useState, useEffect } from 'react';
import {Text, Button, Toggle} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import {InteractiveIconLabel} from "./ui-tools/ui-object";
import { Linking } from 'react-native';


/**
 * Toggle for activate or deactivate notifications
 * ( At this time 06/10/2020 there isn't notification system implemented )
 * @constructor
 */
export function ToggleNotifications() {
    const [isAble, setNotifications] = useState(false);
    useEffect(() => {
        // ask for notification permission if able
    }, [isAble]); // check if isAble have change, skip the useEffect if not

    return (
        <Toggle style={{marginBottom: 15}} checked={isAble} onChange={() => setNotifications()}>
            {evaProps => <Text {...evaProps} >{isAble? 'Notifications activées' : 'Notification désactivées'}</Text>}
        </Toggle>
    )
}

/**
 * Open external mail app to send mail to the support of the app
 * @constructor
 */
export function ContactSupportButton() {
    async function contactSupport() {
        const url = "mailto:contact@beinvestor.fr";
        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) {
            throw new Error('Impossible de contacter le support avec contact@beinvestor.fr');
        }
        Linking.openURL(url).then(() => console.log('Mail open for sending to contact@beinvestor.fr')).catch((error) => {
            console.error("Error on openURL ");
            console.error(error)
        });
    }
    return (
        <InteractiveIconLabel onPressFunction={() => contactSupport(true)} icon={"email"} label={"Contacter le support"}  />
    )
}