/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import * as React from 'react';
import LoginScreen from './app/screens/login-screen';
import HomeScreen from './app/screens/home-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title: 'B€Investor'}}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'B€Investor'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;
