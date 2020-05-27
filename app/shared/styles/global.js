import {StyleSheet, Dimensions} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen/index";

const appColors = {
//***App colors ***//
    primary: '#03a9f4',
    primaryLight: '#67daff',
    primaryDark: '#007ac1',

    secondary: '#6e398d',
    secondaryLight: '#9d65bd',
    secondaryDark: '#3f0a5e',

    white: Colors.white,
    dark: Colors.dark,
    danger: '#ff3d71',
    dangerDark: '#ff0000',
    success: '#3ACB00',
    warning: '#cb7a0d'
};
const {height, width} = Dimensions.get('window');
//*** End app colors *** //
const styles = StyleSheet.create({
    absoluteCenter: {
        position: "absolute",
        top: height/2,
        left: width/2,
    },
    absoluteTop: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10
    },
    absoluteTopLeft: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    absoluteTopRight: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    absoluteBottomRight: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    absoluteBottomLeft: {
        position: "absolute",
        bottom: 10,
        left: 10,
    },
    absoluteBottom: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
    },
    appIconSmall: {
        width: 25,
        height: 25
    },
    appIconMedium: {
        width: 50,
        height: 50
    },
    appIconLarge: {
        width: 100,
        height: 100
    },
    boldedTitle: {
        fontWeight: 'bold',
        color: Colors.dark
    },
    backgroundPrimary: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
        color: Colors.white
    },
    backgroundSecondary: {
        backgroundColor: appColors.secondary,
        borderColor: appColors.secondary,
        color: Colors.white
    },
    errorFormLabel: {
        color: appColors.danger,
        fontWeight: 'bold',
        fontSize: 12,
    },
    fabButton: {
        borderRadius: 100
    },
    fullScreen: {
        flex: 1,
        padding: 15,
        backgroundColor: appColors.white
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRowAlignCenter: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexColumnBetween: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    inputLabelPrimary: {
        color: appColors.primary,
        fontWeight: 'bold'
    },
    inputLabelSecondary: {
        color: appColors.secondary,
        fontWeight: 'bold'
    },
    overlayElement: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 5000,
        backgroundColor: Colors.white,
    },
    textAsLink: {
        color: appColors.primary,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});
module.exports = {styles: styles, appColors: appColors, deviceWidth: width, deviceHeigth: height};