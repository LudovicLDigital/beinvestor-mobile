import {API_URL} from "../util/constants";
import HttpHeaderSetter from "../util/http-header-setter";


export default class SimulatorService {

    constructor() {
        this.resourceURL = API_URL + '/simulator'
    }
    async calculateProject(simulatorDataSendObject) {
        const options = await HttpHeaderSetter.setDefaultHeader('POST');
        options.body = JSON.stringify(simulatorDataSendObject);
        return fetch(`${this.resourceURL}`, options).then((response) => {
            return response.status === 200 ? response.json() : null;
        });
    }
}