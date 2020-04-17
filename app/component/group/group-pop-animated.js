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
import {styles, appColors} from "../../shared/styles/global";
import GroupItem from "./group-item";
import {ROUTE_DETAIL_GRP, ROUTE_MAP, ROUTE_SEARCH_GRP} from "../../shared/util/constants";

const {height, width} = Dimensions.get('window');
const ownStyle = StyleSheet.create({
    animation_view: {
        backgroundColor: appColors.white,
        borderColor: appColors.secondary,
        borderRadius: 5,
        borderWidth: 1,
    },
    absoluteCenter: {
        position: "absolute",
        top: height/6,
        left: width/6,
        zIndex: 1100
    },
});
/**
 * PROPS :
 * - group : the group datas
 * - navigation: the navigation system of the parent
 */
export default class GroupPopAnimated extends Component {
    constructor(props) {
        super(props);
        this.screenWidth = width;
        this.screenHeight = height;
        this.state = {
            widthSize: new Animated.Value(0),
            heightSize: new Animated.Value(0)
        }
    }
    componentDidMount() {
        console.log('play');
        this._playOpenAnimation()
    }
    render() {
        console.log('this.prop')
        console.log(this.props.group)
        return (
            <View style={ownStyle.absoluteCenter}>
                <Animated.View style={[ownStyle.animation_view, {width: this.state.widthSize, height: this.state.heightSize}]}>
                    <Text style={{textAlign: 'center'}} category={'h2'}>{this.props.group.name}</Text>
                    <View style={styles.flexRowAlignCenter}>
                        <Icon width={width/15} height={width/15} fill={appColors.secondary} name='pin-outline'/>
                        <Text category={'h6'}>{this.props.group.city ? this.props.group.city.name : 'Ville inconnue'}</Text>
                    </View>
                    <View style={styles.flexRowAlignCenter}>
                        <Icon width={width/15} height={width/15} fill={appColors.secondary} name='people-outline'/>
                        <Text category={'h6'}>{this.props.group.totalMembers ? this.props.group.totalMembers : 0} Membres</Text>
                    </View>
                    <Button onPress={() => this._goToGroupDetail()}>
                        Voir le groupe
                    </Button>
                </Animated.View>
            </View>
        )
    }

    _playOpenAnimation() {
        Animated.parallel([
            Animated.timing(
                this.state.widthSize,
                {
                    toValue: this.screenWidth/1.5,
                    duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            ),
            Animated.timing(
                this.state.heightSize,
                {
                    toValue: this.screenHeight/2,
                    duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            )
        ]).start() // Lance votre animation avec la fonction start()
    }
    _playCloseAnimation() {
        Animated.parallel([
            Animated.timing(
                this.state.widthSize,
                {
                    toValue: 0,
                    duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            ),
            Animated.timing(
                this.state.heightSize,
                {
                    toValue: 0,
                    duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            )
        ]).start() // Lance votre animation avec la fonction start()
    }
    _goToGroupDetail() {
        this._playCloseAnimation();
        this.props.navigation.navigate(ROUTE_SEARCH_GRP, {
            screen: ROUTE_DETAIL_GRP,
            params: {
                groupDisplayed: this.props.group, isMember: null, previousRouteIdentifier: ROUTE_MAP
            }
        });
    }
}