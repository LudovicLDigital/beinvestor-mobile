import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";


const fillingBarStyle = StyleSheet.create({
    backgroundEmptyBar: {
        backgroundColor: "#dadada",
        borderRadius: 10,
        height: 30
    },
    foreGroundText: {
        color: appColors.dark,
        fontWeight: 'bold',
        position: 'absolute',
        paddingLeft: 5
    },
    foreGroundBar: {
        borderRadius: 10,
        padding: 5,
        height: 30
    }
});
/**
 * PROPS :
 * - title : the title of the corresponding bar
 * - containerStyle : style to add on the first view container
 * - fillingCoef:
 * - maxFill:
 * - fillingColor: choose a hexa color , default will be primary
 */
export default class FillingBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxFlex: (this.props.maxFill - this.props.fillingCoef)
        }
    }

    render() {
        return (
            <View style={[{flex:1}, this.props.containerStyle,fillingBarStyle.backgroundEmptyBar, styles.flexRowAlignCenter]}>
                <View style={[{flex: this.props.fillingCoef, backgroundColor: (this.props.fillingColor ? this.props.fillingColor : appColors.primary)},fillingBarStyle.foreGroundBar]}>
                </View>
                <View style={[fillingBarStyle.backgroundEmptyBar, {flex: this.state.maxFlex}]}>

                </View>
                <Text style={[fillingBarStyle.foreGroundText]}>{this.props.title}</Text>
            </View>
        )
    }
}