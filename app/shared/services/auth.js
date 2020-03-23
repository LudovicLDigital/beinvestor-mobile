
import DeviceStorage from '../util/device-storage';
import Constants from '../util/constants';
const auth = {
    login(loginReceived, passwordReceived) {
        try {
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
            console.log(options);
            return fetch(`${Constants.API_URL}/login`, options ).then((response) => response.json())
                .then((responseJson) => {
                    const tokens = responseJson;
                    if (tokens && tokens.accessToken && tokens.refreshToken) {
                        DeviceStorage.setCurrentUserToken(tokens.accessToken).then(() => {
                            return true;
                        });
                        DeviceStorage.storeNewKeyValue(Constants.REFRESH_TOKEN_KEY, tokens.refreshToken);
                    } else {
                        return false;
                    }
                });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};
module.exports = auth;