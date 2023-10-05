import AsyncStorage from '@react-native-community/async-storage';
import {USER_TOKEN_KEY} from './constants';

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
            return await AsyncStorage.setItem(key.toString(), JSON.stringify(value));
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
            return await AsyncStorage.getItem(key.toString());
        } catch (e) {
            logStorageError(e, 'getKeyValue');
        }
    },
    /**
     * Remove the passed value for the passed key
     * @param key the key you want to remove
     * @returns {Promise<void>}
     */
    async removeKeyValue(key) {
        try {
            return await AsyncStorage.removeItem(key.toString());
        } catch (e) {
            logStorageError(e, 'removeKeyValue');
        }
    },
    /**
     * remove the current user token saved in storage
     * @returns {Promise<void>}
     */
    async removeCurrentUserToken() {
        try {
            return await AsyncStorage.removeItem(USER_TOKEN_KEY.toString());
        } catch (e) {
            logStorageError(e, 'removeCurrentUserToken');
        }
    },
    /**
     * Recover the current logged user token
     */
    async getCurrentUserToken() {
        return this.getKeyValue(USER_TOKEN_KEY.toString());
    },

    /**
     * Save in device the current Access token
     * @param token the access token
     */
    async setCurrentUserToken(token) {
        return this.storeNewKeyValue(USER_TOKEN_KEY.toString(), token.toString());
    }
};
module.exports = deviceStorage;