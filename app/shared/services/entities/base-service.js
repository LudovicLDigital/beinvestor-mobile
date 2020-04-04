import {API_URL} from '../../util/constants';
import HttpHeaderSetter from '../../util/http-header-setter';

/**
 * Extends this base service to have minimum fetch method for your service
 * Don't forget to set the variable resourceURL to your endpoint value (Already contain Constant.API_URL)
 * (for example do : this.resourceURL = this.resourceURL + '/groups')
 */
export default class BaseService {
    constructor() {
        this.resourceURL = API_URL;
    }
    async fetchMethod(options, urlCompletion) {
        return fetch(`${this.resourceURL}${urlCompletion && urlCompletion !== null ? urlCompletion : ''}`, options).then(async(response) => {
            return response.status === 200 ? response.json() : null;
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }
    async fetchMethodWithId(id, urlCompletion, options) {
        return fetch(`${this.resourceURL}${urlCompletion && urlCompletion !== null ? urlCompletion : ''}/${id}`, options).then((response) => {
            return response.status === 200 ? response.json() : null;
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }

    /**
     * Request API with a basic GET method, no body
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async basicGetQuery(urlCompletion) {
        const options = await HttpHeaderSetter.setDefaultHeader('GET');
        return this.fetchMethod(options, urlCompletion);
    }

    /**
     * Request a create to api with an object in body
     * @param objectToPost the object you want to post
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async postObject(objectToPost, urlCompletion) {
        const options = await HttpHeaderSetter.setDefaultHeader('POST');
        options.body = JSON.stringify(objectToPost);
        return this.fetchMethod(options);
    }
    /**
     * Request a update to api with an object in body
     * @param objectToUpdate the object you want to update
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async updateObject(objectToUpdate, urlCompletion) {
        const options = await HttpHeaderSetter.setDefaultHeader('PUT');
        options.body = JSON.stringify(objectToUpdate);
        return this.fetchMethod(options);
    }

    /**
     * Request a delete to api with the corresponding object id
     * @param id the id we want to delete
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async deleteObject(id, urlCompletion) {
        const options = await HttpHeaderSetter.setDefaultHeader('DELETE');
        return this.fetchMethodWithId(id, options);
    }

    /**
     * Request to get only the id searched object
     * @param id the id of the object we want
     * @param urlCompletion : is the precise url, can be null
     * * @returns {Promise<void>}
     */
    async getOneById(urlCompletion,id) {
        const options = await HttpHeaderSetter.setDefaultHeader('GET');
        return this.fetchMethodWithId(id, urlCompletion, options);
    }
}