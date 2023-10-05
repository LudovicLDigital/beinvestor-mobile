import {API_URL} from "../util/constants";

function fetchUrl(url, options) {
    return fetch(url, options).then(async (response) => {
        return response.status === 202 ? response.status : response.json();
    }).then((responseJson) => {
        return Promise.resolve(responseJson);
    }).catch((e) => {
        console.error(e);
        throw e;
    });
}
const resetPass = {
    sendResetKey(mail) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mail: mail})
        };
        return fetchUrl(`${API_URL}/reset-password`, options);
    },
    resetUserPassword(newPassword, keyToReset, mail) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mail: mail, resetKey: keyToReset, newPassword: newPassword})
        };
        return fetchUrl(`${API_URL}/reset-password-end`, options);
    }
};

module.exports = resetPass;