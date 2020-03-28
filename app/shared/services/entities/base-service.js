import Constant from '../../util/constants';
import HttpHeaderSetter from '../../util/http-header-setter';

/**
 * Extends this base service to have minimum fetch method for your service
 * Don't forget to set the variable resourceURL to your endpoint value (Already contain Constant.API_URL)
 * (for example do : this.resourceURL = this.resourceURL + '/groups')
 */
export default class BaseService {
    constructor() {
        this.resourceURL = Constant.API_URL;
    }
    async fetchMethod(options) {
        return fetch(`${this.resourceURL}`, options).then(async(response) => {
            console.log(`=======SHOWING response`);
            console.log(response);
            return response.json();
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }
    async fetchMethodWithId(id, options) {
        return fetch(`${this.resourceURL}/${id}`, options).then((response) => {
            return response.json();
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }

    /**
     * Request API with a basic GET method, no body
     * @returns {Promise<void>}
     */
    async basicGetQuery() {
        const options = await HttpHeaderSetter.setDefaultHeader('GET');
        console.log(`=======SHOWING options`);
        console.log(options);
        return this.fetchMethod(options);
    }

    /**
     * Request a create to api with an object in body
     * @param objectToPost the object you want to post
     * @returns {Promise<void>}
     */
    async postObject(objectToPost) {
        const options = await HttpHeaderSetter.setDefaultHeader('POST');
        options.body = JSON.stringify(objectToPost);
        return this.fetchMethod(options);
    }
    /**
     * Request a update to api with an object in body
     * @param objectToUpdate the object you want to update
     * @returns {Promise<void>}
     */
    async updateObject(objectToUpdate) {
        const options = await HttpHeaderSetter.setDefaultHeader('PUT');
        options.body = JSON.stringify(objectToUpdate);
        return this.fetchMethod(options);
    }

    /**
     * Request a delete to api with the corresponding object id
     * @param id the id we want to delete
     * @returns {Promise<void>}
     */
    async deleteObject(id) {
        const options = await HttpHeaderSetter.setDefaultHeader('DELETE');
        return this.fetchMethodWithId(id, options);
    }

    /**
     * Request to get only the id searched object
     * @param id the id of the object we want
     * @returns {Promise<void>}
     */
    async getOneById(id) {
        const options = await HttpHeaderSetter.setDefaultHeader('GET');
        return this.fetchMethodWithId(id, options);
    }
}