import BaseService from "./base-service";

export default class UserInvestorProfilService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/user-investor-profil';
    }

    async getCurrentUserInvestorProfil() {
        return await this.basicGetQuery('/current')
    }
    async getUserInvestorProfilByPersonalInfoId(userPersonalInfoId) {
        return await this.getOneById(null, userPersonalInfoId)
    }
    async updateCurrentInvestorProfil(userInvestorDatas) {
        return await this.updateObject(userInvestorDatas, '/current')
    }
    async createCurrentInvestorProfil(userInvestorDatas) {
        return await this.postObject(userInvestorDatas, '/current')
    }
}