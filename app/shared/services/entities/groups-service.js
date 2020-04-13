import BaseService from "./base-service";

export default class GroupService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/groups';
    }
    async getAllGroups() {
        return await this.basicGetQuery();
    }
    async getAllGroupsOfCurrentUser() {
        return await this.basicGetQuery('/current');
    }
    async searchGroupByCityName(term) {
        return await this.basicGetQuery('/city/search/' + term)
    }
    async searchGroupByTerm(term) {
        return await this.basicGetQuery('/terms/' + term)
    }
    async getCityOfGroup(groupId) {
        return await this.getOneById('/city/of', groupId)
    }
    async getMembersOfGroup(groupId) {
        return await this.getOneById('/members/of', groupId)
    }
    async currentUserJoinGroup(groupId) {
        return await this.postObject({}, '/current/' + groupId)
    }
    async currentUserLeftGroup(groupId) {
        return await this.deleteObject('/current', groupId)
    }
    async currentIsMember(groupId) {
        return await this.getOneById('/current/is-member', groupId)
    }
}
