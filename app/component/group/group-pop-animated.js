import React, {Component} from "react";
import {
    View,
    Animated,
    StyleSheet,
    Easing,
    Dimensions
} from "react-native";
import {
    Button,
    Text,
    Icon
} from '@ui-kitten/components';
import {styles, appColors, deviceHeigth, deviceWidth} from "../../shared/styles/global";
import {ROUTE_DETAIL_GRP, ROUTE_MAP, ROUTE_SEARCH_GRP} from "../../shared/util/constants";
import {CloseCircleIcon} from "../subcomponent/basic-icons";
import FieldWithIcon from '../subcomponent/field-with-icon';
import PopUp from '../subcomponent/animation/pop-up';
/**
 * PROPS :
 * - group : the group datas
 * - navigation: the navigation system of the parent
 * - showPop: boolean to close the pop
 * - closePop: call back to hide pop when user click on close button of the pop
 */
export default class GroupPopAnimated extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PopUp>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button
                        style={{width: deviceWidth/10}}
                        size={'medium'}
                        onPress={() => this.emitClosePop()}
                        appearance='ghost'
                        icon={CloseCircleIcon}>
                    </Button>
                </View>
                <Text style={{textAlign: 'center'}} category={'h3'}>{this.props.group.name}</Text>
                <FieldWithIcon iconName={'pin-outline'}
                               textCategory={'h6'}
                               colorIcon={appColors.secondary}
                               textDisplay={this.props.group.city ? this.props.group.city.name : 'Ville inconnue'} />
                <FieldWithIcon iconName={'people-outline'}
                               textCategory={'h6'}
                               colorIcon={appColors.secondary}
                               textDisplay={`${this.props.group.totalMembers ? this.props.group.totalMembers : 0} Membres`} />
                <Button
                    appearance='outline' onPress={() => this._goToGroupDetail()}>
                    Voir le groupe
                </Button>
            </PopUp>
        )
    }
    emitClosePop() {
        this.props.closePop();
    }
    _goToGroupDetail() {
        this.props.navigation.navigate(ROUTE_SEARCH_GRP, {
            screen: ROUTE_DETAIL_GRP,
            params: {
                groupDisplayed: this.props.group, isMember: null, previousRouteIdentifier: ROUTE_MAP
            }
        });
    }
}