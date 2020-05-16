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
import {Icon, Button} from '@ui-kitten/components';
import { ROUTE_DETAIL_GRP, ROUTE_MAP, ROUTE_SEARCH_GRP} from "../../shared/util/constants";
import {delimitACircleAround, showToast} from "../../shared/util/ui-helpers";
import GouvAdressService from "../../shared/services/gouv-adresse-service";
import BeInvestorAutoComplete from "../subcomponent/autocomplete";
import GroupPopAnimated from '../group/group-pop-animated';
const CurrentPositionIcon = (style) => (
    <Icon {...style} fill={appColors.secondary} name='compass-outline' />
);
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
            currentLocation: null,
            searchResults: [],
            citySelect: null,
            showPopGroup: false,
            groupForPop: null,
        };
        this._previousRegionLooked = this._initialRegion;
        this.gouvAdressService = new GouvAdressService();
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
                this._setActualPosition(position);
                this.setState({
                    regionLooked: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );

    }
    _watchUserPositionChange() {
        Geolocation.watchPosition((position) => {
                if (this.state.currentLocation && (position.coords.latitude !== this.state.currentLocation.latitude && position.coords.longitude !== this.state.currentLocation.longitude)) {
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
            {distanceFilter: 200, enableHighAccuracy: true, interval: 15000, fastestInterval: 10000 })
    }
    _setActualPosition(position) {
        this.setState({
            currentLocation: position.coords
        });
        if (this._showingCurrentPosition) {
            this.goToCurrentUserPosition(false, this.state.currentLocation.latitude, this.state.currentLocation.longitude, true);
            this._checkPositionIfNeedLoadData(this.state.currentLocation);
        }
    }
    onRegionChangeCompleted(region) {
        if (this._navigatingOnMap) {
            this._showingCurrentPosition = false;
            this._checkPositionIfNeedLoadData(region);
        }
    }
    _checkPositionIfNeedLoadData(regionDisplayed) {
        const circleAroundPrevious = delimitACircleAround(this._previousRegionLooked, 50);
        if (!(this._isInLimitToLoad(regionDisplayed, circleAroundPrevious))) {
            const franceCircle = delimitACircleAround(this._initialRegion, 650);
            if (this._isInLimitToLoad(regionDisplayed, franceCircle)) {
                this._recoverGroups(regionDisplayed.latitude, regionDisplayed.longitude);
                this._previousRegionLooked = regionDisplayed;
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
                         onPress={() => this.closePop()}
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
                {this.state.showPopGroup &&
                    <GroupPopAnimated
                        closePop={() => this.closePop()}
                        showPop={this.state.showPopGroup}
                        navigation={this.props.navigation}
                        group={this.state.groupForPop}/>}
                <BeInvestorAutoComplete
                    style={[styles.absoluteTop, {zIndex: 1000}]}
                    autocompleteList={this.state.searchResults}
                    onChoiceSelect={(item) => this.onChoiceSelect(item)}
                    onTxtChange={(text) => this.onTxtChange(text)}
                    placeholder={'Rechercher une ville'}/>
                <Button
                    style={[styles.absoluteBottomRight, styles.fabButton, {zIndex: 1000, backgroundColor: appColors.white, borderColor: appColors.secondary}]}
                    size={'large'}
                    onPress={() => this.goToCurrentUserPosition(true, this.state.currentLocation.latitude, this.state.currentLocation.longitude, true)}
                    accessoryLeft ={CurrentPositionIcon}>
                </Button>
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
        this.setState({
            showPopGroup: true,
            groupForPop: group
        })
    }

    mapDragged() {
        this.closePop();
        this._navigatingOnMap = true;
    }

    goToCurrentUserPosition(fromButton, latitude, longitude, isGoingOnUserPosition) {
        this.map.getCamera().then((camera) => {
            if (this.state.currentLocation) {
                camera.center.latitude = latitude;
                camera.center.longitude = longitude;
                if (fromButton) {
                    camera.zoom = 14;
                }
                if (isGoingOnUserPosition) {
                    this._showingCurrentPosition = true;
                    this._navigatingOnMap = false;
                } else {

                    this._showingCurrentPosition = false;
                    this._navigatingOnMap = true;
                }
                this.map.animateCamera(camera);
            }
        })
    }


    onChoiceSelect(item) {
        this.closePop();
        this.setState({
            citySelect: item
        });
        this.goToCurrentUserPosition(false, item.geoCoords.latitude, item.geoCoords.longitude, false)
    }

    onTxtChange(text) {
        this.closePop();
        if (text && text.trim() !== '' && text.trim().length > 2) {
            this.gouvAdressService.getAdressesCorresponding(text).then((results) => {
                this._prepareDataForAutoComplete(results.features);
            }).catch((error) => {
                showToast('ERROR FROM GOUV API');
                console.error(error);
            })
        } else if (text === null) {
            this.setState({
                searchResults: [],
            });
        }
    }
    _prepareDataForAutoComplete(results) {
        const tempArray = [];
        results.forEach((data) => {
            tempArray.push({
                title: data.properties.label + ', ' + data.properties.postcode,
                city: data.properties.city,
                postCode: data.properties.postcode,
                context: data.properties.context,
                geoCoords: {
                    latitude: data.geometry.coordinates[1],
                    longitude: data.geometry.coordinates[0],
                }
            });
        });
        this.setState({
            searchResults: tempArray,
        });
    }

    closePop() {
        this.setState({
            showPopGroup: false,
            groupForPop: null
        });
    }
}