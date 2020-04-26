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
    async changeUserProfilPicture(picture, userId) {
        const ext = picture.path.split('.');
        const file = {
            uri: picture.path,
            name: 'user-pic-of-' + userId + '.' + ext[1],
            type: picture.mime
        };
        return await this.sendFile(file, '/save-profil-pic');
    }
    async getProfilPictureOfCurrent() {
        return await this.getFile('/current/profil-pic');
    }
}
