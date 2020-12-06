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

const store = createStore();
class App extends Component {

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
