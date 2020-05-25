import React, {Component} from "react";
import {
    Animated, Easing, StyleSheet,
    View
} from "react-native";
import {styles, appColors, deviceWidth, deviceHeigth} from "../../../shared/styles/global";
const ownStyle = StyleSheet.create({
    circle : {
        backgroundColor: appColors.danger,
        borderColor: appColors.dark,
        borderRadius: 100,
        height: 25,
        width: 25,
        borderWidth: 1,
    },
    animation_view_container: {
        width: 15,
        height: 50,
        borderColor: appColors.dark,
        borderWidth: 1,
        alignItems: 'center'
    },
    animation_view_filler: {
        width: 13,
        backgroundColor: appColors.danger,
    },
    absoluteCenter: {
        position: "absolute",
        top: deviceHeigth/6,
        left: deviceWidth/6,
        alignItems: 'center',
        zIndex: 1100
    },
});
export default class Thermometer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightSize: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this._playOpenAnimation()
    }
    _playOpenAnimation() {
            Animated.timing(
                this.state.heightSize,
                {
                    toValue: 48,
                    duration: 2000,
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            ).start();
    }

    render() {
        return (
            <View style={ownStyle.absoluteCenter}>
                <View style={[ownStyle.animation_view_container]}>
                    <Animated.View style={[ownStyle.animation_view_filler, {height: this.state.heightSize}]}>
                    </Animated.View>
                </View>
                <View style={[ownStyle.circle]}/>
            </View>
        )
    }
}