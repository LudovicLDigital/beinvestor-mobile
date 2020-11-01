import React, {useEffect, useState} from "react";
import {Animated} from "react-native";
import LottieView from 'lottie-react-native';

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