import BaseService from "./base-service";

export default class UsersService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/users';
    }
    async getCurrentUser() {
        return await this.basicGetQuery('/current')
    }
    async updateUser(userDatas) {
        return await this.updateObject(userDatas, null);
    }
    async updateCurrentUser(userDatas) {
        return await this.updateObject(userDatas, '/current')
    }
    async changePassword(password, newPassword) {
        return await this.postObject({password: password, newPassword: newPassword}, '/change-password');
    }
}
