import React from "react";
import { TouchableWithoutFeedback, Keyboard, ToastAndroid} from 'react-native';
export const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export function showToast(message) {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}