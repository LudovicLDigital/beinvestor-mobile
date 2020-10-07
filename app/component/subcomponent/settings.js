import React, { useState, useEffect } from 'react';
import {Text, Button, Toggle} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";
import {InteractiveIconLabel} from "./ui-tools/ui-object";
import {Alert, Linking} from 'react-native';
import {ROUTE_LOGIN} from "../../shared/util/constants";
import AuthService from "../../shared/services/auth";
import UsersService from "../../shared/services/entities/users-service";
import {showToast} from "../../shared/util/ui-helpers";


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

/**
 *  This button able the current user to delete his own account with an alert validation to confirm his action
 * @param navigation the current navigation system from his parent
 * @returns {*}
 * @constructor
 */
export function DeleteAccountButton({navigation}) {

    async function askForSure() {
        Alert.alert(
            "Souhaitez-vous vraiment supprimer votre compte ?",
            "Nous sommes navrés de vous voir partir, cette action est irréversible, il vous faudra créer un nouveau compte si vous souhaitez revenir.",
            [
                {
                    text: 'Annuler',
                    onPress: () => {}
                },
                {
                    text: 'Supprimer',
                    onPress: () => {
                       deleteUsersData();
                    }
                }
            ]
        )
    }
    async function deleteUsersData() {
        const _userService = new UsersService();
        _userService.deleteUser().then((httpResponse) => {
            if (httpResponse && httpResponse === 204 ) {
                navigation.popToTop(); // back to first page (login page)
            } else {
                showToast('Une erreur est survenue lors de la suppression, réessayez plus tard');
            }
        }).catch((error) => {
            showToast('Une erreur est survenue lors de la suppression, réessayez plus tard');
            console.error(error);
            throw new Error(error);
        })
    }

    return (
        <InteractiveIconLabel onPressFunction={() => askForSure()} icon={"delete"} label={"Supprimer mon compte"}/>
    )
}