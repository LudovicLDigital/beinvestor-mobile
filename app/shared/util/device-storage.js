import AsyncStorage from '@react-native-community/async-storage';
import Constants from './constants';
function logStorageError(e, method) {
    console.error(`ERROR WHEN USE STORAGE, TRIED TO ${method} : ${e}`);
}
const deviceStorage = {
    /**
     * Store in device storage the value for the key
     * @param key the key you want save
     * @param value the value to linke to the key
     * @returns {Promise<void>} return a promise when finish
     */
    async storeNewKeyValue(key, value) {
        try {
            return await AsyncStorage.setItem(key, value);
        } catch (e) {
            logStorageError(e, 'storeNewKeyValue');
        }
    },

    /**
     * Recover the value which is linked to a key
     * @param key the key you want retrieve
     * @returns {Promise<void>}
     */
    async getKeyValue(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            logStorageError(e, 'getKeyValue');
        }
    },

    /**
     * Recover the current logged user token
     */
    async getCurrentUserToken() {
        return this.getKeyValue(Constants.USER_TOKEN_KEY);
    },

    /**
     * Save in device the current Access token
     * @param token the access token
     */
    async setCurrentUserToken(token) {
        return this.storeNewKeyValue(Constants.USER_TOKEN_KEY, token);
    }
};
module.exports = deviceStorage;