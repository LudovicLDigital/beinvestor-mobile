import React, {Component} from "react";
import {Animated, Easing, Text, View} from "react-native";
import {styles} from "../../shared/styles/global";

/**
 * PROPS :
 * - isDisplayed : use to display or not the loader dynamically
 * - loadTitle: the loader text display during the apparition of the loader
 * - parentHeight: the parent height use for animation
 */
export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // house 0
            H0size: new Animated.Value(0),
            H0Position: new Animated.Value(0),
            // house 1
            H1size: new Animated.Value(0),
            H1Position: new Animated.Value(0),
            // house 2
            H2size: new Animated.Value(0),
            H2Position: new Animated.Value(0),
            // house 3
            H3size: new Animated.Value(0),
            H3Position: new Animated.Value(0),
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        if (this.props.parentHeight !== null ) {
            this._playOpenAnimation()
        }
    }
    _playOpenAnimation() {
        Animated.loop(
            Animated.sequence([
                this._onHouseAnimationAppear(this.state.H0size, this.state.H0Position),
                this._onHouseAnimationAppear(this.state.H1size, this.state.H1Position),
                this._onHouseAnimationAppear(this.state.H2size, this.state.H2Position),
                this._onHouseAnimationAppear(this.state.H3size, this.state.H3Position),
                this._onHouseAnimationGone(this.state.H0size, this.state.H0Position),
                this._onHouseAnimationGone(this.state.H1size, this.state.H1Position),
                this._onHouseAnimationGone(this.state.H2size, this.state.H2Position),
                this._onHouseAnimationGone(this.state.H3size, this.state.H3Position)
            ])
        ).start(); // Lance votre animation avec la fonction start() et permet de detecter la fin avec le parametre finish, s'il est false, alors l'animation n'a pas atteint sa fin prévue (stop lancé avant ou autre)
    }
    _onHouseAnimationAppear(size, position) {
        return Animated.parallel([
            Animated.timing(
                size,
                {
                    toValue: 50,
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.out(Easing.quad), // https://easings.net/fr
                }
            ),
            Animated.timing(
                position,
                {
                    toValue: this.props.parentHeight - (this.props.parentHeight / 1.5),
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.out(Easing.quad), // https://easings.net/fr
                }
            )
        ])
    }
    _onHouseAnimationGone(size, position) {
        return Animated.parallel([
            Animated.timing(
                size,
                {
                    toValue: 0,
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.out(Easing.quad), // https://easings.net/fr
                }
            ),
            Animated.timing(
                position,
                {
                    toValue: 0,
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.out(Easing.quad), // https://easings.net/fr
                }
            )
        ])
    }
    render() {
        if (this.props.isDisplayed) {
            return (
                <View style={[{flex:1}, styles.flexCenter, styles.overlayElement]}>
                    <Text style={[styles.boldedTitle, {textAlign: 'center'}]}>{this.props.loadTitle}</Text>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <Animated.Image source={require('../../assets/loader-house0.png')} style={{width: this.state.H0size, height: this.state.H0size, top: this.state.H0Position}}/>
                        <Animated.Image source={require('../../assets/loader-house1.png')} style={{width: this.state.H1size, height: this.state.H1size, top: this.state.H1Position}}/>
                        <Animated.Image source={require('../../assets/loader-house2.png')} style={{width: this.state.H2size, height: this.state.H2size, top: this.state.H2Position}}/>
                        <Animated.Image source={require('../../assets/loader-house3.png')} style={{width: this.state.H3size, height: this.state.H3size, top: this.state.H3Position}}/>
                    </View>
                </View>
            )
        } else {
            return null;
        }
    }
}