import DeviceStorage from '../util/device-storage';
import {API_URL, REFRESH_TOKEN_KEY} from '../util/constants';
import HttpHeaderSetter from "../util/http-header-setter";
import UsersService from "./entities/users-service";
import {showInfoAlert} from "../util/ui-helpers";

const auth = {
    currentUser: null,
    getCurrentUser() {
        if (this.currentUser && this.currentUser !== null) {
            return Promise.resolve(this.currentUser);
        } else {
            return new Promise(async (resolve) => {
                const userService = new UsersService();
                try {
                    this.currentUser = await userService.getCurrentUser();
                    resolve(this.currentUser);
                } catch (error) {
                    console.error('Error to get current user from api');
                    console.error(error);
                }
            })
        }
    },
    currentUserHaveBeenUpdate(user) {
        this.currentUser = user;
    },
    login(loginReceived, passwordReceived, deviceId) {
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
                    password: passwordReceived,
                    deviceId: deviceId
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
    async autoLogin(deviceId) {
        return DeviceStorage.getKeyValue(REFRESH_TOKEN_KEY).then(async (refreshToken) => {
            if (refreshToken && refreshToken !== null) {
                const options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: refreshToken,
                        deviceId: deviceId
                    })
                };
                return fetch(`${API_URL}/token`, options).then((response) => {
                    return response.status === 200 ? response.json() : null;
                }).then((responseJson) => {
                    if (responseJson && responseJson !== null) {
                        return DeviceStorage.setCurrentUserToken(responseJson.accessToken).then(() => {
                            return Promise.resolve(true);
                        }).catch(() => Promise.resolve(false));
                    } else {
                        Promise.resolve(false);
                    }
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
                return fetch(`${API_URL}/logout`, options).then(async (response) => {
                    if (response.status === 204) {
                        return DeviceStorage.removeCurrentUserToken().then(() => {
                            DeviceStorage.removeKeyValue(REFRESH_TOKEN_KEY);
                            return Promise.resolve(true);
                        }).catch((error) => {
                            console.error(`ERROR TO set undefined current user token : ${error}`);
                            return Promise.resolve(false);
                        });
                    } else {
                        showInfoAlert(await response.json().message);
                        return Promise.resolve(false);
                    }
                }).catch((error) => {
                    console.error(`ERROR TO fetch logout : ${error}`);
                    return Promise.resolve(false);
                })
            })
        });
    },
    register(userDatas) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDatas)
        };
        return fetchUrl(`${API_URL}/subscribe`, options);
    },
    activate(code, mail) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({activationCode: code, mail: mail})
        };
        return fetchUrl(`${API_URL}/activate`, options);
    },
    resendActivation(mail) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail: mail})
        };
        return fetchUrl(`${API_URL}/resend-activate`, options)
    }
};
function fetchUrl(url, options) {
    return fetch(url, options).then(async (response) => {
            return response.status === 200 ? response.json() : response.status;
    }).then((responseJson) => {
        return Promise.resolve(responseJson);
    }).catch((e) => {
        console.error(e);
        throw e;
    });
}
module.exports = auth;