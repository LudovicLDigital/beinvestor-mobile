
import DeviceStorage from '../util/device-storage';
import Constants from '../util/constants';
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
            return fetch(`${Constants.API_URL}/login`, options).then((response) => {
              return response.json()
            })
                .then((responseJson) => {
                    const tokens = responseJson;
                    if (tokens && tokens.accessToken && tokens.refreshToken) {
                        return new Promise((resolve) => {
                            DeviceStorage.setCurrentUserToken(tokens.accessToken).then(() => {
                                DeviceStorage.storeNewKeyValue(Constants.REFRESH_TOKEN_KEY, tokens.refreshToken);
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
    }
};
module.exports = auth;