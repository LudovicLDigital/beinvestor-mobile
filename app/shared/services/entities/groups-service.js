import BaseService from "./base-service";

export default class GroupService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/groups';
    }
    async getAllGroups() {
        return await this.basicGetQuery();
    }
    async searchGroupByCityName(term) {
        return await this.basicGetQuery('/city/search/' + term)
    }
    async searchGroupByTerm(term) {
        return await this.basicGetQuery('/terms/' + term)
    }
}
