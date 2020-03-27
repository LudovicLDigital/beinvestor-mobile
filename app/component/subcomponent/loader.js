import React, { Component } from "react";
import {
    Text,
    ActivityIndicator,
    View
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";

/**
 * PROPS :
 * - isDisplayed : use to display or not the loader dynamically
 * - loadTitle: the loader text display during the apparition of the loader
 */
export default class Loader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isDisplayed) {
            return (
                <View style={[styles.fullScreenFlexCenter, styles.overlayElement]}>
                    <Text style={styles.boldedTitle}>{this.props.loadTitle}</Text>
                    <ActivityIndicator size={100} color={appColors.primaryDark}/>
                </View>
            )
        } else {
            return null;
        }
    }
}