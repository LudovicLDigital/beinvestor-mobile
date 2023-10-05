import BaseService from "./base-service";
import {PAGINATION_SIZE} from "../../util/constants";
import BeInvestorOneSignalPushService from "../one-signal-push-service";

export default class GroupService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/groups';
    }
    async getAllGroupsAroundUser(userPosition) {
        return await this.postObject(userPosition, '/load-perimeter');
    }
    async getAllGroups(pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery('/all/' + JSON.stringify(pagination));
    }
    async getAllGroupsOfCurrentUser(pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery('/current/' + JSON.stringify(pagination));
    }
    async searchGroupByCityName(term, pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery('/city/search/' + term + '/' + JSON.stringify(pagination))
    }
    async searchGroupByTerm(term, pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery('/terms/' + term + '/' + JSON.stringify(pagination))
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
