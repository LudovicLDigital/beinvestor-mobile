/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from "react";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from "./app/shared/util/navigation";
import * as eva from '@eva-design/eva';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import SplashScreen from 'react-native-splash-screen';
import VersionCheck from 'react-native-version-check';
import {Linking} from 'react-native';
import codePush from "react-native-code-push";
import {StoreProvider} from "easy-peasy";
import createStore from "./app/shared/util/Store";
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const store = createStore();
function myiOSPromptCallback(permission){
    // do something with permission value
}
class App extends Component {
    constructor(properties) {
        super(properties);
        //Remove this method to stop OneSignal Debugging
        OneSignal.setLogLevel(6, 0);

        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init("38f82230-f76d-4f81-bda1-d87f68eb8aa7", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.


        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    }
    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }
    componentDidMount(): void {
        SplashScreen.hide();
        admob()
            .setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.PG,

                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,

                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true,
            })
            .then(() => {
                // Request config successfully set!
            });
        VersionCheck.needUpdate()
            .then(async res => {
                if (res.isNeeded) {
                    Linking.openURL(res.storeUrl);  // open store if update is needed.
                }
            });
    }

    render() {
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                    <StoreProvider store={store}>
                        <AppNavigator/>
                    </StoreProvider>
                </ApplicationProvider>
            </React.Fragment>
        )
    }

}
export default codePush(App);
