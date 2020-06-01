import React from "react";
import {Alert, Keyboard, ToastAndroid, TouchableWithoutFeedback} from 'react-native';
import {DAY, HOUR, MINUTE} from "./constants";

export const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export function showToast(message) {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
}
export function showInfoAlert(message, isALongmessage) {
    if (!isALongmessage) {
    Alert.alert(
        message,
    )} else {
    Alert.alert(
        '',
        message,
    )}
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
            return 'un instant';
        }
    } else {
        return 'un instant';
    }
}
/**
 * Permet de retrouver le min et le maximum pour les longitudes et latitude autour d'un point avec un cercle de rayon donné
 * @param positionCenter est un object tel que : positionCenter: {latitude: number, longitude: number}
 * @param circleDistance est la distance en km souhaitée pour le rayon du cercle à tracer autour de positionCenter
 * @return Object un Object contenant les données : latitudeMin, latitudeMax, longitudeMin, longitudeMax
 */
export function delimitACircleAround(positionCenter, circleDistance) {
    // centre du cercle
    const latitudeBase = positionCenter.latitude;
    const longitudeBase = positionCenter.longitude;

    // ecart permis sur la latitude en degre
    const deltaLatitude = circleDistance / 114;

    // ecart permis sur la longitude en degre
    let deltaLongitude;
    if (Math.abs(latitudeBase) >= 0 && Math.abs(latitudeBase) < 10) deltaLongitude = circleDistance / 111;
    if (Math.abs(latitudeBase) >= 10 && Math.abs(latitudeBase) < 20) deltaLongitude = circleDistance / 110;
    if (Math.abs(latitudeBase) >= 20 && Math.abs(latitudeBase) < 30) deltaLongitude = circleDistance / 105;
    if (Math.abs(latitudeBase) >= 30 && Math.abs(latitudeBase) < 40) deltaLongitude = circleDistance / 96;
    if (Math.abs(latitudeBase) >= 40 && Math.abs(latitudeBase) < 50) deltaLongitude = circleDistance / 85;
    if (Math.abs(latitudeBase) >= 50 && Math.abs(latitudeBase) < 60) deltaLongitude = circleDistance / 72;
    if (Math.abs(latitudeBase) >= 60 && Math.abs(latitudeBase) < 70) deltaLongitude = circleDistance / 56;
    if (Math.abs(latitudeBase) >= 70 && Math.abs(latitudeBase) < 80) deltaLongitude = circleDistance / 38;
    if (Math.abs(latitudeBase) >= 80 && Math.abs(latitudeBase) < 90) deltaLongitude = circleDistance / 19;
    if (Math.abs(latitudeBase) >= 90) deltaLongitude = 180;

    // bornes min/max des latitudes/latitudes
    const latitudeMin = latitudeBase - deltaLatitude;
    const latitudeMax = latitudeBase + deltaLatitude;
    const longitudeMin = longitudeBase - deltaLongitude;
    const longitudeMax = longitudeBase + deltaLongitude;
    return {
        latitudeMin: latitudeMin,
        latitudeMax: latitudeMax,
        longitudeMin: longitudeMin,
        longitudeMax: longitudeMax,
    };
}
