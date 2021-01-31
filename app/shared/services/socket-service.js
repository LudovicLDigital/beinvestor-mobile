import SocketIoClient from 'socket.io-client';
import {SOCKET_URL} from "../util/constants";
import GroupService from "./entities/groups-service"
import {showGroupMessageToast} from "../util/ui-helpers";

export default class SocketService {
    static socketServer: null;
    static connectToBackEnd() {
        const groupService = new GroupService();
        SocketService.socketServer = SocketIoClient(SOCKET_URL);
        groupService.getAllGroupsOfCurrentUser({
            page: 0,
            numberItem: 22
        }).then((groups) => {
            if (groups && groups.results.length > 0) {
                groups.results.forEach((group) => {
                    if (SocketService.socketServer) {
                        this.joinAChannel(group.id);
                        SocketService.socketServer.on(`receivedMessage-${group.id}`, function (groupMessage) {
                            showGroupMessageToast(groupMessage.content);
                        });
                    }
                })
            }
        })
    };
    static joinAChannel(groupId) {
        if (SocketService.socketServer) {
            SocketService.socketServer.emit('joinGroupChannel',groupId); // rejoins le channel du groupId
        }
    }
    static leaveAGroupChannel(groupId) {
        if (SocketService.socketServer) {
            SocketService.socketServer.emit('leaveGroupChannel', groupId); // quitte le channel du groupId
        }
    }
};