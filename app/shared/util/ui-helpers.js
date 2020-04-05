import React from "react";
import { TouchableWithoutFeedback, Keyboard, ToastAndroid} from 'react-native';
import {DAY, HOUR, MINUTE} from "./constants";
export const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export function showToast(message) {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}
export function calculDurationFromNow(date) {
    let delta = -1;
    let time = 0;
    if (date) {
        const datePassed = new Date(date);
        const actualDate = new Date();
        delta = actualDate.getTime() - datePassed.getTime();
        if (delta > MINUTE && delta < HOUR) {
            const rest = delta % MINUTE;
            if (rest > 0) {
                delta = delta - rest;
            }
            time = delta / MINUTE;
            return time + ' minutes';
        } else if (delta < MINUTE) {
            return delta + ' secondes';
        } else if (delta > HOUR && delta < DAY) {
            const rest = delta % HOUR;
            if (rest > 0) {
                delta = delta - rest;
            }
            time = delta / HOUR;
            return time + ' heures';
        } else if (delta >= DAY) {
            const rest = delta % DAY;
            if (rest > 0) {
                delta = delta - rest;
            }
            time = delta / DAY;
            return time + ' jours';
        } else {
            return delta;
        }
    } else {
        return delta;
    }
}