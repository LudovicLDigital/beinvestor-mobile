import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen/index";

const appColors = {
//***App colors ***//
    primary: '#03a9f4',
    primaryLight: '#67daff',
    primaryDark: '#007ac1',

    secondary: '#6e398d',
    secondaryLight: '#9d65bd',
    secondaryDark: '#3f0a5e',
};
//*** End app colors *** //
const styles = StyleSheet.create({
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
        fontWeight: '900',
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
    fullScreen: {
        flex: 1,
        padding: 15
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: Colors.white,
    },
});
module.exports = {styles: styles, appColors: appColors};