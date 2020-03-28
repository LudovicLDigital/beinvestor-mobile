import DeviceStorage from './device-storage';
const httpHeaderSetter = {
    async setDefaultHeader(method) {
        const token = await DeviceStorage.getCurrentUserToken();
        const bearer = `Bearer ${token}`;
        const options = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        };
        return options;
    }
};
module.exports = httpHeaderSetter;