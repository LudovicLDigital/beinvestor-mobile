import React, {Component} from "react";
import {
    PermissionsAndroid,
    Text,
    View,
    FlatList
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import GroupService from "../../shared/services/entities/groups-service";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CityService from "../../shared/services/entities/city-service";
import {showToast} from "../../shared/util/ui-helpers";

/**
 * PROPS :
 * - group: pass the group datas
 */
class CustomMarker extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{backgroundColor: "red", padding: 10}}>
                <Text>{this.props.group.name}</Text>
            </View>
        )
    }
}
/**
 * PROPS :
 * - navigation: pass the actual navigation system
 */
export default class CustomMap extends Component {
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.cityService = new CityService();
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
        this._recoverGroups();
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
            <View style={[{flex: 1}]}>
                <MapView style={[{flex:1, zIndex: 10}]}
                         showsUserLocation={true}
                         showsMyLocationButton={false}
                         initialRegion={{
                             latitude: this.state.currentLocation.coords.latitude,
                             longitude: this.state.currentLocation.coords.longitude,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}>
                    {this.state.groups.map(group => {
                            if (group.geoCoords) {
                                return (
                                    <Marker
                                        identifier={group.id.toString()}
                                        key={group.id.toString()}
                                        coordinate={{
                                            latitude: group.geoCoords?.latitude,
                                            longitude: group.geoCoords?.longitude
                                        }}>
                                        <CustomMarker group={group}/>
                                    </Marker>
                                )
                            } else {
                                return null;
                            }
                        }
                    )}
                </MapView>
                {/*test dessous*/}
                {/*<FlatList style={{flex: 1, padding: 15}} data={this.state.groups} keyExtractor={(item, index) => item.id.toString()}*/}
                {/*renderItem={({item}) => <Text>geo : {'lat : ' + item.geoCoords?.latitude + 'long : ' + item.geoCoords?.longitude} group {item.name}</Text> }/>*/}
            </View>
        )
    }


    _recoverGroups() {
        this.groupService.getAllGroups({page: 0, numberItem: 22}).then((groups) => {
            this._prepareGeoPositionOfGroups(groups.results)
        }).catch((error) => {
            console.log(error);
        });
    }
    _prepareGeoPositionOfGroups(groups) {
        if (groups && groups.length > 0) {
            groups.forEach((group) => {
                this.cityService.getGeoAdressOfCity(group.cityId).then((geoAdress) => {
                    group.geoCoords = geoAdress;
                }).catch((error) => {
                    showToast('ERREUR POUR RECUPERER LA GEOLOCALISATION DES GROUPES :  ' + error.status);
                    console.error(error);
                })
            });
            this.setState({
                groups: groups
            });
        }
    }
}