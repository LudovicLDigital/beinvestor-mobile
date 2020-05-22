import BaseService from "./base-service";

export default class FiscalTypeService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/fiscal-type';
    }
    async getFiscalTypes() {
        return await this.basicGetQuery(null);
    }
}
