
import DeviceStorage from '../util/device-storage';
import {API_URL, USER_TOKEN_KEY, REFRESH_TOKEN_KEY} from '../util/constants';
import HttpHeaderSetter from "../util/http-header-setter";
const auth = {
    login(loginReceived, passwordReceived) {
        if (loginReceived && passwordReceived &&
            loginReceived.toString().trim() !== '' && passwordReceived.toString().trim() !== '') {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: loginReceived,
                    password: passwordReceived
                })
            };
            return fetch(`${API_URL}/login`, options).then((response) => {
                return response.json()
            }).then((responseJson) => {
                const tokens = responseJson;
                if (tokens && tokens.accessToken && tokens.refreshToken) {
                    return new Promise((resolve) => {
                        DeviceStorage.setCurrentUserToken(tokens.accessToken).then(() => {
                            DeviceStorage.storeNewKeyValue(REFRESH_TOKEN_KEY, tokens.refreshToken);
                            resolve(true);
                        });
                    });
                } else {
                    return Promise.resolve(false);
                }
            }).catch((e) => {
                console.error(e);
                throw e;
            });
        } else {
            return Promise.resolve(false);
        }
    },
    autoLogin() {
        return DeviceStorage.getKeyValue(REFRESH_TOKEN_KEY).then((refreshToken) => {
            if (refreshToken &&  refreshToken !== null) {
                return fetch(`${API_URL}/token/${refreshToken}`).then((response) => {
                    return response.json()
                }).then((responseJson) => {
                    return DeviceStorage.setCurrentUserToken(responseJson.accessToken).then(() => {
                        return Promise.resolve(true);
                    }).catch(() => Promise.resolve(false));
                }).catch((error) => {
                    console.error(`ERROR TO fetch : ${error}`);
                    return Promise.resolve(false);
                });
            } else {
                return Promise.resolve(false);
            }
        }).catch((error) => {
            console.error(`ERROR TO getKeyValue : ${error} `);
            return Promise.resolve(false)
        });
    },
    logout() {
        return HttpHeaderSetter.setDefaultHeader('DELETE').then((options) => {
            return DeviceStorage.getKeyValue(REFRESH_TOKEN_KEY).then((tokenSaved) => {
                options.body = JSON.stringify({
                    token: tokenSaved
                });
                return fetch(`${API_URL}/logout`, options).then((response) => {
                    if (response.status === 200) {
                        return DeviceStorage.removeCurrentUserToken().then(() => {
                            DeviceStorage.removeKeyValue(REFRESH_TOKEN_KEY);
                            return Promise.resolve(true);
                        }).catch((error) => {
                            console.error(`ERROR TO set undefined current user token : ${error}`);
                            return Promise.resolve(false);
                        });
                    } else {
                        return Promise.resolve(false);
                    }
                }).catch((error) => {
                    console.error(`ERROR TO fetch logout : ${error}`);
                    return Promise.resolve(false);
                })
            })
        });
    }
};
module.exports = auth;