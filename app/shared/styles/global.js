import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen/index";

const appColors = {
//***App colors ***//
    primary: '#03a9f4',
    primaryLight: '#67daff',
    primaryDark: '#007ac1',

    secondary: '#64dd17',
    secondaryLight: '#9cff57',
    secondaryDark: '#1faa00',
};
//*** End app colors *** //
const styles = StyleSheet.create({
    fullScreenFlexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary
    },
    overlayElement: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: Colors.white,
    },
    boldedTitle: {
        fontWeight: '900',
        color: Colors.dark
    }
});
module.exports = {styles: styles, appColors: appColors};