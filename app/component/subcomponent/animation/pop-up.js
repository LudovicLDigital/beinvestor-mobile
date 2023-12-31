import React, {Component} from "react";
import {Animated, Easing, StyleSheet, View} from "react-native";
import {appColors, deviceHeigth, deviceWidth, styles} from "../../../shared/styles/global";

const ownStyle = StyleSheet.create({
    animation_view: {
        backgroundColor: appColors.white,
        borderColor: appColors.secondary,
        borderRadius: 5,
        borderWidth: 1,
    },
    absoluteCenter: {
        position: "absolute",
        top: deviceHeigth/6,
        left: deviceWidth/6,
        zIndex: 1100
    },
});
export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthSize: new Animated.Value(0),
            heightSize: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this._playOpenAnimation()
    }
    _playOpenAnimation() {
        Animated.parallel([
            Animated.timing(
                this.state.widthSize,
                {
                    toValue: deviceWidth/1.5,
                    duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            ),
            Animated.timing(
                this.state.heightSize,
                {
                    toValue: deviceHeigth/2.5,
                    duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.inOut(Easing.exp), // https://easings.net/fr
                }
            )
        ]).start(); // Lance votre animation avec la fonction start() et permet de detecter la fin avec le parametre finish, s'il est false, alors l'animation n'a pas atteint sa fin prévue (stop lancé avant ou autre)
    }

    render() {
        return (
            <View style={ownStyle.absoluteCenter}>
                <Animated.View style={[ownStyle.animation_view,
                    styles.flexColumnBetween,
                    {overflow: 'hidden', width: this.state.widthSize, height: this.state.heightSize}]}>
                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}