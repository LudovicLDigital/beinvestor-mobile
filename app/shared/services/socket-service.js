import SocketIoClient from 'socket.io-client';
import {SOCKET_URL} from "../util/constants";
import GroupService from "./entities/groups-service"

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
                            console.log('message received : ' + groupMessage.content) // todo: here put notification system
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