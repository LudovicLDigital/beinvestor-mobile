import React from "react";
import {Text, View} from "react-native";
import LottieView from 'lottie-react-native';
import {styles} from "../../../shared/styles/global";

/**
 * Props
 *  - endFrame : must be between 0 and 12 , 12 will be the max
 */
export default function DataLoader({}) {
    return (
        <LottieView
            autoPlay={true}
            loop={true}
            style={{flex: 1, width: 40, height: 40}}
            source={require('../../../assets/loader.json')} />
    )
}
/**
 * PROPS :
 * - isDisplayed : use to display or not the loader dynamically
 * - loadTitle: the loader text display during the apparition of the loader
 */
export function EstateLoader({isDisplayed, loadTitle}) {
    if (isDisplayed) {
        return (
            <View style={[{flex:1}, styles.flexCenter, styles.overlayElement]}>
                <Text style={[styles.boldedTitle, {textAlign: 'center'}]}>{loadTitle}</Text>
                <LottieView
                    autoPlay={true}
                    loop={true}
                    style={{flex: 1, width: 40, height: 40}}
                    source={require('../../../assets/estate_loader.json')}/>
            </View>
        )
    } else {
        return null
    }
}