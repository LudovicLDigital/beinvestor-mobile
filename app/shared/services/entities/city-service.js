import BaseService from "./base-service";
import {PAGINATION_SIZE} from "../../util/constants";

export default class CityService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/city';
    }
    async getAllCities(pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery('/all/' + JSON.stringify(pagination));
    }
    async getCitiesByName(name, pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery('/name/' + name + '/' + JSON.stringify(pagination));
    }
    async getCityById(cityId) {
        return await this.getOneById(null, cityId)
    }
    async getGeoAdressOfCity(cityId) {
        return await this.getOneById('/geo-adress-of', cityId)
    }
    async getCityAveragePriceM2(postCode) {
        return await this.getOneById('/price', postCode)
    }
}
