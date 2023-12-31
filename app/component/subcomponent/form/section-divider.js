import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {appColors} from "../../../shared/styles/global";

const ownSectionDividerStyle = StyleSheet.create({
    line: {
        flex: 1,
        height: 1,
        backgroundColor: appColors.secondary,
        alignSelf: 'center'
    },
    textContainer: {
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center'
    },
    textTitle: {
        textAlign: 'center',
        color: appColors.secondary
    }
});
/**
 * PROPS :
 * - sectionName : the string display for the section
 * - containerStyle : the main container style (as margins)
 */
export default class SectionDivider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{flex: 1, flexDirection: 'row'}, this.props.containerStyle]}>
                <View style={ownSectionDividerStyle.line}>

                </View>
                {this.props.sectionName && <View style={ownSectionDividerStyle.textContainer}>
                    <Text style={ownSectionDividerStyle.textTitle}>{this.props.sectionName}</Text>
                </View>}
                <View style={ownSectionDividerStyle.line}>

                </View>
            </View>
        )
    }
}