
import * as React from 'react';
import LoginScreen from "../../screens/login-screen";
import {Colors} from "react-native/Libraries/NewAppScreen/index";
import HomeScreen from "../../screens/home-screen";
import { appColors} from '../../shared/styles/global';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export const AppNavigator = () => (
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
);