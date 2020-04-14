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
import {Icon} from '@ui-kitten/components';
import {ROUTE_DETAIL_GRP, ROUTE_MAP, ROUTE_SEARCH_GRP} from "../../shared/util/constants";
import {convertRouteNameToLisible} from "../../shared/util/converter-for-route-name";
/**
 * PROPS :
 * - group: pass the group datas
 */
class CustomMarker extends Component {
    constructor(props) {
        super(props);
        this.cityService = new CityService();
        this.state = {
            groupCity: null
        };
    }

    componentDidMount(): void {
        this.cityService.getCityById(this.props.group.cityId).then((city) => {
            this.setState({
                groupCity: city,
            });
        }).catch((error) => {
            showToast('Erreur pour récupérer la ville du group : ' + this.props.group.name);
            console.error(error);
        })
    }

    render() {
        return (
            <View style={[{padding: 10, borderRadius: 10}, styles.backgroundPrimary]}>
                <Text style={[{fontSize: 15, fontWeight: 'bold',color: appColors.white}]}>Groupe {this.props.group.name}</Text>
                <View style={styles.flexRowAlignCenter}>
                    <Icon width={15} height={15} fill={appColors.white} name='pin-outline'/>
                    <Text style={[{color: appColors.white}]}>{this.state.groupCity ? this.state.groupCity.name : 'Ville inconnue'}</Text>
                </View>
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
                         showsMyLocationButton={true}
                         maxZoomLevel={16}
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
                                        onPress={() => this._goToDetailGroup(group)}
                                        coordinate={{
                                            latitude: group.geoCoords.latitude,
                                            longitude: group.geoCoords.longitude
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
            </View>
        )
    }


    _recoverGroups() {
        this.groupService.getAllGroups({page: 3, numberItem: 5}).then((groups) => {
            this._prepareGeoPositionOfGroups(groups.results)
        }).catch((error) => {
            console.log(error);
        });
    }
    _prepareGeoPositionOfGroups(groups) {
        if (groups && groups.length > 0) {
            groups.forEach((group) => {
                this.cityService.getGeoAdressOfCity(group.cityId).then((geoAdress) => {
                    group.geoCoords = {
                        latitude: parseFloat(geoAdress.latitude),
                        longitude: parseFloat(geoAdress.longitude)
                    };
                    this.setState({
                        groups: groups
                    });
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

    _goToDetailGroup(group) {
        this.props.navigation.navigate(ROUTE_SEARCH_GRP, {
            screen: ROUTE_DETAIL_GRP,
            params: {
                groupDisplayed: group, isMember: null, previousRouteIdentifier: ROUTE_MAP
            }
        });
    }
}