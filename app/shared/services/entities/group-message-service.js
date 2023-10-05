import BaseService from "./base-service";
import {PAGINATION_SIZE} from "../../util/constants";

export default class GroupMessageService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/group-message';
    }
    async getAllGroupMessage(groupId, pagination) {
        if (!pagination || pagination === null) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery(`/group/${groupId}/${JSON.stringify(pagination)}`);
    }
    async getLastMessageOfGroup(groupId) {
        return await this.getOneById('/last/of', groupId);
    }
    async postAndEmitAmessage(groupMessage) {
        return await this.postObject(groupMessage, null)
    }
    async putMessage(groupMessage) {
        return await this.putMessage(groupMessage);
    }
    async deleteMesssage(groupMessage) {
        return await this.deleteObject(null, groupMessage.groupId);
    }
    async getCountOfAllUserSMessage(userInfoId) {
        return await this.getOneById('/count/user', userInfoId);
    }
    async getCountOfAllUserSMessageInAGroup(userInfoId, groupId) {
        return await this.basicGetQuery(`/count/user/${userInfoId}/${groupId}`);
    }
    async getCountOfAllMessageInAGroup(groupId){
        return await this.getOneById('/count/group', groupId);
    }
}
