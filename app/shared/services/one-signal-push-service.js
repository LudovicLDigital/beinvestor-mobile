import {ONE_SIGNAL_API_KEY, ONE_SIGNAL_APP_ID} from "../util/constants";
import OneSignal from 'react-native-onesignal';
import {showGroupMessageToast} from "../util/ui-helpers";


export default class BeInvestorOneSignalPushService {

    initializeOneSignalSystem() {
        // INIT ONE SIGNAL
        OneSignal.setRequiresUserPrivacyConsent(true);
        OneSignal.setAppId(ONE_SIGNAL_APP_ID);
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            OneSignal.getDeviceState().then((device) => {
                setUserDeviceId(device.userId);
                let notif = notifReceivedEvent.getNotification();
                if (notif.additionalData.userId !== device.userId) {
                    notifReceivedEvent.complete(); // will silent the notification, used for the sender to not seeing his own push
                } else {
                    showGroupMessageToast(notif.body);
                }
            });
        });
        // ONE SIGNAL HANDLERS
        OneSignal.setNotificationOpenedHandler(notification => this.onOpened(notification));
        OneSignal.addPermissionObserver(event => {
            console.log("OneSignal: permission changed:", event);
        });
    }

    onOpened(openResult) {
        console.log('DEBUG ======= openResult');
        console.log(openResult);
    }
    setOneSignalListenerOff() {
        OneSignal.clearHandlers();
    }
    static sendNotification(data, groupId, deviceId) {
        const groupKey = `is_in_group_${groupId}`;
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`
        };
        let endpoint = "https://onesignal.com/api/v1/notifications";
        OneSignal.getTags((receivedTags) => {
            console.log('DEBUG ======= receivedTags');
            console.log(receivedTags);
        });
        let params = {
            method: 'POST',
            headers: headers,
            port: 443,
            body: JSON.stringify({
                app_id: ONE_SIGNAL_APP_ID,
                included_segments: ["Active Users"],
                filters: [
                    {field: 'tag', key: groupKey, relation: '=', value: 'true'}
                ],
                headings: {en: 'Message sur BeInvestor', fr: 'Message sur BeInvestor'},
                contents: {en: data, fr: data},
                data: {'userId': deviceId}
            })
        };
        console.log('DEBUG ======= params.body.filters');
        console.log(params.body);
        fetch(endpoint, params)
            .then((res) => {
                if (res.status === 200) {
                    console.log(`${Date.now()} - Push sended to OneSignal API in group ${groupId}`);
                } else {
                    console.log(`${Date.now()} - ERROR OCCURED WHEN SENDING PUSH, status is ${res.status} detail :`);
                    console.log(res)
                }
            })
            .catch((reject) => {
                console.error(`${Date.now()} - ERROR IN SEND NOTIFICATION FETCH ONE SIGNAL : `);
                console.error(reject)
            });
    };

    /**
     * Associate the device id to a group for future notification send
     * @param groupId
     * @param joined indicate if user is joining or quitting group
     */
    static addAGroupTagOnUser(groupId: number, joined: boolean) {
        const groupKey = `is_in_group_${groupId}`;
        OneSignal.sendTags(groupKey, joined);
    }
}