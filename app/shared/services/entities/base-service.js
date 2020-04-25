import {API_URL} from '../../util/constants';
import HttpHeaderSetter from '../../util/http-header-setter';
import {showToast} from "../../util/ui-helpers";
import RNFetchBlob from 'rn-fetch-blob'
import DeviceStorage from "../../util/device-storage";
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
            if ((response.status < 200 || response.status >= 300) && response.status !== 404) {
                showToast('Erreur fetchMethod on '+ urlCompletion+ ' error -->' + response.statusText + " code : " + response.status);
                return null;
            } else {
                return response.status === 200 ? response.json() : null;
            }
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }
    async fetchFile(urlCompletion) {
        const token = await DeviceStorage.getCurrentUserToken();
        const bearer = `Bearer ${token}`;
        const options = {
                'Content-Type': 'multipart/form-data,octet-stream',
                'Authorization': bearer
            };
        return RNFetchBlob.fetch('GET', `${this.resourceURL}${urlCompletion && urlCompletion !== null ? urlCompletion : ''}`, options).then((response) => {
            return response;
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }
    async fetchMethodWithId(id, urlCompletion, options) {
        return fetch(`${this.resourceURL}${urlCompletion && urlCompletion !== null ? urlCompletion : ''}/${id}`, options).then((response) => {
            if ((response.status < 200 || response.status >= 300) && response.status !== 404) {
                showToast('Erreur fetchMethodWithId on '+ urlCompletion+ ' error -->' + response.statusText + " code : " + response.status);
                return null;
            } else {
                return response.status === 200 ? response.json() : null;
            }
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
     * Request API with a basic GET method, for a file
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async getFile(urlCompletion) {
        return this.fetchFile( urlCompletion);
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
        return this.fetchMethod(options, urlCompletion);
    }

    /**
     * Request to send a file to api
     * @param file the file to send
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async sendFile(file, urlCompletion) {
        const options = await HttpHeaderSetter.setFormDataHeader('POST');
        options.body = new FormData();
        options.body.append('file', file);
        return this.fetchMethod(options, urlCompletion);
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
        return this.fetchMethod(options, urlCompletion);
    }

    /**
     * Request a delete to api with the corresponding object id
     * @param id the id we want to delete
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async deleteObject( urlCompletion, id) {
        const options = await HttpHeaderSetter.setDefaultHeader('DELETE');
        return this.fetchMethodWithId(id, urlCompletion, options);
    }
    /**
     * Request a delete to api with the corresponding object id in body
     * Use a simple fetch method
     * @param id the id we want to delete
     * @param urlCompletion : is the precise url, can be null
     * @returns {Promise<void>}
     */
    async deleteObjectWithIdInBody( urlCompletion, id) {
        const options = await HttpHeaderSetter.setDefaultHeader('DELETE');
        return this.fetchMethod(urlCompletion, options);
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