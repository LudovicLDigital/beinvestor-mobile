
import * as React from 'react';
import {Colors} from "react-native/Libraries/NewAppScreen/index";
import { appColors} from '../../shared/styles/global';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
    ROUTE_USER_PROFIL_INVEST,
    ROUTE_FAV_GRP,
    ROUTE_HOME,
    ROUTE_INFO,
    ROUTE_LOGIN,
    ROUTE_SETTING,
    ROUTE_SEARCH_GRP,
    ROUTE_SIMULATOR,
    ROUTE_USER_PROFIL
} from './constants'
// screens
import HomeScreen from "../../screens/home-screen";
import LoginScreen from "../../screens/login-screen";
import SimulatorScreen from "../../screens/simulator-screen";
import UserProfilScreen from "../../screens/user-profil-screen";
import SearchGroupScreen from "../../screens/search-group-screen";
import SettingsScreen from "../../screens/settings-screen";
import AppInfoScreen from "../../screens/app-info-screen";
// component
import {CustomDrawerContent} from '../../component/subcomponent/drawer/custom-drawer-content'
import UserProfilInvestorScreen from "../../screens/user-profil-investor-screen";

const ProfilEditStack = createStackNavigator();
function ProfilStackNavigator() {
    return (
        <ProfilEditStack.Navigator initialRouteName={ROUTE_USER_PROFIL}>
            <ProfilEditStack.Screen
                name={ROUTE_USER_PROFIL}
                component={UserProfilScreen}
                options={{
                    headerShown: false
                }}
            />
            <ProfilEditStack.Screen
                name={ROUTE_USER_PROFIL_INVEST}
                component={UserProfilInvestorScreen}
                options={{
                    headerShown: false
                }}/>
        </ProfilEditStack.Navigator>
    )
}

const HomeDrawer = createDrawerNavigator();
function HomeDrawerNavigator() {
    return (
        <HomeDrawer.Navigator initialRouteName={ROUTE_HOME} drawerContent={props => <CustomDrawerContent {...props}/>} >
            <HomeDrawer.Screen
            name={ROUTE_HOME}
            component={HomeScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name={ROUTE_SIMULATOR}
            component={SimulatorScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name={ROUTE_USER_PROFIL}
            component={ProfilStackNavigator}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
                name={ROUTE_SEARCH_GRP}
                component={SearchGroupScreen}
                options={{
                    headerShown: false
                }}
            />
            <HomeDrawer.Screen
            name={ROUTE_FAV_GRP}
            component={SearchGroupScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name={ROUTE_SETTING}
            component={SettingsScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name={ROUTE_INFO}
            component={AppInfoScreen}
            options={{
                headerShown: false
            }}
            />
        </HomeDrawer.Navigator>
    )
}
const MainStack = createStackNavigator();
export const AppNavigator = () => (
    <NavigationContainer >
        <MainStack.Navigator initialRouteName={ROUTE_LOGIN}>
            <MainStack.Screen
                name={ROUTE_LOGIN}
                component={LoginScreen}
                options={{
                    title: 'Bienvenue sur BeInvestor !',
                    headerStyle: { backgroundColor: appColors.primary },
                    headerTitleStyle: { color: Colors.white},
                    headerTitleContainerStyle: {left: 90}
                }}
            />
            <MainStack.Screen
                name={ROUTE_HOME}
                component={HomeDrawerNavigator}
                options={{
                    headerShown: false
                }}
            />
        </MainStack.Navigator>
    </NavigationContainer>
);