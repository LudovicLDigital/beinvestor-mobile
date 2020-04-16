import React, {Component} from "react";
import {
    PermissionsAndroid,
    Text,
    View
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import GroupService from "../../shared/services/entities/groups-service";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Icon} from '@ui-kitten/components';
import { ROUTE_DETAIL_GRP, ROUTE_MAP, ROUTE_SEARCH_GRP} from "../../shared/util/constants";
import {delimitACircleAround} from "../../shared/util/ui-helpers";

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
            <View style={[{padding: 10, borderRadius: 10}, styles.backgroundPrimary]}>
                <Text style={[{fontSize: 15, fontWeight: 'bold',color: appColors.white}]}>Groupe {this.props.group.name}</Text>
                <View style={styles.flexRowAlignCenter}>
                    <Icon width={15} height={15} fill={appColors.white} name='pin-outline'/>
                    <Text style={[{color: appColors.white}]}>{this.props.group.city.name ? this.props.group.city.name : 'Ville inconnue'}</Text>
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
    _showingCurrentPosition = false;
    _navigatingOnMap;
    map = null;
    _initialRegion = {
        latitude: 46.5594357,
        longitude: 2.3994582,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    };
    _previousRegionLooked;
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: [],
            regionLooked: this._initialRegion,
            currentLocation: null
        };
    }

    componentDidMount(): void {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then((granted) => {
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._watchUserPositionChange();
                this._currentPosition();
            } else {
                this._recoverGroups(this._initialRegion.latitude, this._initialRegion.longitude);
            }
        });
    }

    componentWillUnmount(): void {
        Geolocation.stopObserving();
    }

    _currentPosition() {
        Geolocation.getCurrentPosition(
            (position) => {
                this._showingCurrentPosition = true;
                this._navigatingOnMap = false;
                this._setActualPosition(position)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );

    }
    _watchUserPositionChange() {
        Geolocation.watchPosition((position) => {
                if (this._showingCurrentPosition &&
                    (position.coords.latitude !== this.state.currentLocation.latitude && position.coords.longitude !== this.state.currentLocation.longitude)) {
                    if (!this._navigatingOnMap) {
                        this._setActualPosition(position)
                    }
                } else {
                    this._navigatingOnMap = false;
                }
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {distanceFilter: 200, enableHighAccuracy: true, interval: 60000, fastestInterval: 45000 })
    }
    _setActualPosition(position) {
        this.setState({
            currentLocation: position.coords,
            regionLooked: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            }
        });
        this._previousRegionLooked = this.state.regionLooked;
        this.map.animateToRegion(this.state.regionLooked);
        this._recoverGroups(this.state.currentLocation.latitude, this.state.currentLocation.longitude);
    }
    onRegionChangeCompleted(region) {
        if (this._navigatingOnMap) {
            this._showingCurrentPosition = false;
            const circleAroundPrevious = delimitACircleAround(this._previousRegionLooked, 50);
            // if suivant cherche a voir déplacer la carte de plus de 50 km,  il faut alors recharger le perimetre de 100km de recherche
            if (!(this._isInLimitToLoad(region, circleAroundPrevious))) {
                const franceCircle = delimitACircleAround(this._initialRegion, 650);
                if (this._isInLimitToLoad(region, franceCircle)) {
                    this._recoverGroups(region.latitude, region.longitude);
                    this._previousRegionLooked = region;
                }
            }
        }
    }
    _isInLimitToLoad(region, circleLimit) {
        if (region.latitude >= circleLimit.latitudeMin && region.latitude <= circleLimit.latitudeMax
            && region.longitude >= circleLimit.longitudeMin && region.longitude <= circleLimit.longitudeMax) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        return (
            <View style={[{flex: 1}]}>
                <MapView style={[{flex:1, zIndex: 10}]}
                         ref={map => this.map = map}
                         showsUserLocation={true}
                         followsUserLocation={true}
                         minZoomLevel={8}
                         maxZoomLevel={16}
                         initialRegion={this.state.regionLooked}
                         onPanDrag={() => this.mapDragged()}
                         onRegionChangeComplete={(region) => this.onRegionChangeCompleted(region)}>
                    {this.state.groups.map(group => {
                            if (group.geoCoords) {
                                return (
                                    <Marker
                                        identifier={group.id.toString()}
                                        key={group.id.toString()}
                                        onPress={() => this._goToDetailGroup(group)}
                                        coordinate={{
                                            latitude: parseFloat(group.geoCoords.latitude),
                                            longitude: parseFloat(group.geoCoords.longitude)
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
    _recoverGroups(latitude, longitude) {
        this.groupService.getAllGroupsAroundUser({latitude: latitude, longitude: longitude}).then((groups) => {
            if (groups && groups !== null) {
                this.setState({
                    groups: groups
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    _goToDetailGroup(group) {
        this.props.navigation.navigate(ROUTE_SEARCH_GRP, {
            screen: ROUTE_DETAIL_GRP,
            params: {
                groupDisplayed: group, isMember: null, previousRouteIdentifier: ROUTE_MAP
            }
        });
    }

    mapDragged() {
        this._navigatingOnMap = true;
    }
}