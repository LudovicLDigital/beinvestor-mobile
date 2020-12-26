import BaseService from "./base-service";

export default class UserInvestorProfilService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/user-investor-profil';
    }

    async getCurrentUserInvestorProfil() {
        return await this.basicGetQuery('/current');
    }
    async getUserInvestorProfilByPersonalInfoId(userPersonalInfoId) {
        return await this.getOneById(null, userPersonalInfoId)
    }
    async updateCurrentInvestorProfil(userInvestorDatas) {
        const reformatedFromGetter = this._recoverPrivateAttributOfModelObject(userInvestorDatas);
        return await this.updateObject(reformatedFromGetter, '/current')
    }
    async createCurrentInvestorProfil(userInvestorDatas) {
        const reformatedFromGetter = this._recoverPrivateAttributOfModelObject(userInvestorDatas);
        return await this.postObject(reformatedFromGetter, '/current')
    }

    _recoverPrivateAttributOfModelObject(userInvestorDatas) {
        return {
            id:  userInvestorDatas.id,
            actualCreditMensualities: userInvestorDatas.actualCreditMensualities,
            professionnalSalary: userInvestorDatas.professionnalSalary,
            annualRent: userInvestorDatas.annualRent,
            fiscalPart: userInvestorDatas.fiscalPart,
            nbEstate: userInvestorDatas.nbEstate
        };
    }
}