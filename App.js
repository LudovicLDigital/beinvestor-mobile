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
import {styles, appColors} from './app/shared/styles/global';
import {Colors} from "react-native/Libraries/NewAppScreen/index";
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light } from '@eva-design/eva';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
    return (
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={mapping} theme={light}>
                <NavigationContainer >
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{
                                title: 'Bienvenue sur BeInvestor !',
                                headerStyle: { backgroundColor: appColors.primary },
                                headerTitleStyle: { color: Colors.white},
                                headerTitleContainerStyle: {left: 90}
                            }}
                        />
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                title: 'B€Investor',
                                headerShown: false
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ApplicationProvider>
        </React.Fragment>
    )
};

export default App;
