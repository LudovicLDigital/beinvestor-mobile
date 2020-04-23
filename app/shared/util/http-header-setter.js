import DeviceStorage from './device-storage';
const httpHeaderSetter = {
    async setDefaultHeader(method) {
        const token = await DeviceStorage.getCurrentUserToken();
        const bearer = `Bearer ${token}`;
        return {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        };
    },
    async setFormDataHeader(method) {
        const token = await DeviceStorage.getCurrentUserToken();
        const bearer = `Bearer ${token}`;
        return {
            method: method,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': bearer
            }
        };
    }
};
module.exports = httpHeaderSetter;