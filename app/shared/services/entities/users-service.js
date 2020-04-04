import BaseService from "./base-service";

export default class UsersService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/users';
    }
    async getCurrentUser() {
        return await this.basicGetQuery('/current')
    }
}
