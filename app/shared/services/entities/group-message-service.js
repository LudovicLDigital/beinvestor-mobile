import BaseService from "./base-service";
import {PAGINATION_SIZE} from "../../util/constants";

export default class GroupMessageService extends BaseService {
    constructor() {
        super();
        this.resourceURL = this.resourceURL + '/group-message';
    }
    async getAllGroupMessage(groupId, pagination) {
        if (!pagination) {
            pagination = {
                page: 0,
                numberItem: PAGINATION_SIZE
            }
        }
        return await this.basicGetQuery(`/group/${groupId}/${pagination}`);
    }
    async getLastMessageOfGroup(groupId) {
        return await this.getOneById('/last/of', groupId);
    }
}
