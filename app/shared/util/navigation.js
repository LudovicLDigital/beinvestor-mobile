
import * as React from 'react';
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
    ROUTE_USER_PROFIL, ROUTE_DETAIL_GRP, ROUTE_MAP, ROUTE_MEMBERS_LIST, ROUTE_REGISTER, ROUTE_RESET_PASSWORD
} from './constants'
// screens
import HomeScreen from "../../screens/home-screen";
import LoginScreen from "../../screens/login-screen";
import SimulatorScreen from "../../screens/simulator/simulator-screen";
import UserProfilScreen from "../../screens/user-profil/user-profil-screen";
import SearchGroupScreen from "../../screens/group/search-group-screen";
import SettingsScreen from "../../screens/settings-screen";
import AppInfoScreen from "../../screens/app-info-screen";
// component
import {CustomDrawerContent} from '../../component/subcomponent/drawer/custom-drawer-content'
import UserProfilInvestorScreen from "../../screens/user-profil/user-profil-investor-screen";
import GroupDetailScreen from "../../screens/group/group-detail-screen";
import UsersScreen from "../../screens/users-screen";
import RegisterScreen from "../../screens/register-screen";
import ResetPassScreen from "../../screens/reset-pass-screen";
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
const GroupFavStack = createStackNavigator();
function GroupFavStackNavigator() {
    return (
        <GroupFavStack.Navigator initialRouteName={ROUTE_FAV_GRP}>
            <GroupFavStack.Screen
                name={ROUTE_FAV_GRP}
                component={SearchGroupScreen}
                options={{
                    headerShown: false
                }}
            />
            <GroupFavStack.Screen
                name={ROUTE_DETAIL_GRP}
                component={GroupDetailScreen}
                options={{
                    headerShown: false
                }}/>
            <GroupFavStack.Screen
                name={ROUTE_MEMBERS_LIST}
                component={UsersScreen}
                options={{
                    headerShown: false
                }}/>
        </GroupFavStack.Navigator>
    )
}
const GroupSearchStack = createStackNavigator();
function GroupSearchStackNavigator() {
    return (
        <GroupSearchStack.Navigator initialRouteName={ROUTE_SEARCH_GRP}>
            <GroupSearchStack.Screen
                name={ROUTE_SEARCH_GRP}
                component={SearchGroupScreen}
                options={{
                    headerShown: false
                }}
            />
            <GroupSearchStack.Screen
                name={ROUTE_DETAIL_GRP}
                component={GroupDetailScreen}
                options={{
                    headerShown: false
                }}/>
            <GroupFavStack.Screen
                name={ROUTE_MEMBERS_LIST}
                component={UsersScreen}
                options={{
                    headerShown: false
                }}/>
        </GroupSearchStack.Navigator>
    )
}

const HomeDrawer = createDrawerNavigator();
function HomeDrawerNavigator() {
    return (
        <HomeDrawer.Navigator initialRouteName={ROUTE_MAP} drawerContent={props => <CustomDrawerContent {...props}/>} >
            <HomeDrawer.Screen
            name={ROUTE_MAP}
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
                component={GroupSearchStackNavigator}
                options={{
                    headerShown: false
                }}
            />
            <HomeDrawer.Screen
            name={ROUTE_FAV_GRP}
            component={GroupFavStackNavigator}
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
                    headerTitleStyle: { color: appColors.white},
                    headerTitleContainerStyle: {left: 90}
                }}
            />
            <MainStack.Screen
                name={ROUTE_REGISTER}
                component={RegisterScreen}
                options={{
                    title: 'S\'inscrire sur BeInvestor',
                    headerStyle: { backgroundColor: appColors.primary },
                    headerTitleStyle: { color: appColors.white},
                    headerTitleContainerStyle: {left: 90}
                }}
            />
            <MainStack.Screen
                name={ROUTE_RESET_PASSWORD}
                component={ResetPassScreen}
                options={{
                    title: 'Mot de passe oublié',
                    headerStyle: { backgroundColor: appColors.primary },
                    headerTitleStyle: { color: appColors.white},
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