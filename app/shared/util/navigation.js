
import * as React from 'react';
import {Colors} from "react-native/Libraries/NewAppScreen/index";
import { appColors} from '../../shared/styles/global';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
        <ProfilEditStack.Navigator initialRouteName="UserProfil">
            <ProfilEditStack.Screen
                name="UserProfil"
                component={UserProfilScreen}
                options={{
                    headerShown: false
                }}
            />
            <ProfilEditStack.Screen
                name="UserProfilInvestor"
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
        <HomeDrawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props}/>} >
            <HomeDrawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name="Simulator"
            component={SimulatorScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name="UserProfil"
            component={ProfilStackNavigator}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name="FavoritesGroups"
            component={SearchGroupScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                headerShown: false
            }}
            />
            <HomeDrawer.Screen
            name="AppInfo"
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
        <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Bienvenue sur BeInvestor !',
                    headerStyle: { backgroundColor: appColors.primary },
                    headerTitleStyle: { color: Colors.white},
                    headerTitleContainerStyle: {left: 90}
                }}
            />
            <MainStack.Screen
                name="Home"
                component={HomeDrawerNavigator}
                options={{
                    headerShown: false
                }}
            />
        </MainStack.Navigator>
    </NavigationContainer>
);