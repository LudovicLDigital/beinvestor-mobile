import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import {SafeAreaView, View, Text, PermissionsAndroid} from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import SearchBar from "../component/subcomponent/search-bar";
import {DismissKeyboard} from "../shared/util/ui-helpers";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
export default class HomeScreen extends Component {
    isMainScreen: boolean;
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: [],
            currentLocation: {
                coords:
                    {
                        accuracy: 12.875,
                        altitude: 404.20001220703125,
                        heading: 0,
                        latitude: 45.7790407,
                        longitude: 3.107877,
                        speed: 0
                    },
                mocked: false,
                timestamp: 1586079323195
            }
        };
        this.isMainScreen = true;
    }
    componentDidMount(): void {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then((granted) => {
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({currentLocation: position});
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                );
            }
        });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} hideAriane={true} navigation={this.props.navigation}/>
                <DismissKeyboard>
                    <Layout style={{flex:1}}>
                        <View style={[{flex:1}]}>
                            <MapView style={[{flex:1, zIndex: 10}]}
                                     initialRegion={{
                                         latitude: this.state.currentLocation.coords.latitude,
                                         longitude: this.state.currentLocation.coords.longitude,
                                         latitudeDelta: 0.0922,
                                         longitudeDelta: 0.0421,
                                     }}>
                                <Marker coordinate={{latitude: this.state.currentLocation.coords.latitude, longitude: this.state.currentLocation.coords.longitude}}
                                        title={'Vous'}
                                />
                            </MapView>
                            <SearchBar style={[styles.absoluteTop, {zIndex: 1000}]} placeholder={'Rechercher une ville'}/>
                        </View>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }

    async recover() {
        this.groupService.getAllGroups().then((groups) => {
            this.setState({
                groups: groups
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}