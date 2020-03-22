/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
    SafeAreaView,
    StatusBar,
} from 'react-native';


const App: () => React$Node = () => {
    return (
        <NavigationContainer >
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
