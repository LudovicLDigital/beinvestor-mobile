import {ONE_SIGNAL_API_KEY, ONE_SIGNAL_APP_ID, OS_USER_ID_TAG} from "../util/constants";
import OneSignal from 'react-native-onesignal';


export default class BeInvestorOneSignalPushService {

    initializeOneSignalSystem() {
        // INIT ONE SIGNAL
        OneSignal.setRequiresUserPrivacyConsent(true);
        OneSignal.setAppId(ONE_SIGNAL_APP_ID);
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
    static sendNotification(data, groupId, groupDeviceIds) {
        let headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        let endpoint = "https://onesignal.com/api/v1/notifications";
        let params = {
            method: 'POST',
            headers: headers,
            port: 443,
            body: JSON.stringify({
                app_id: ONE_SIGNAL_APP_ID,
                include_player_ids: groupDeviceIds,
                headings: {en: 'Message sur BeInvestor', fr: 'Message sur BeInvestor'},
                contents: {en: data, fr: data},
                data: {'groupId': groupId}
            })
        };
        console.log('DEBUG ======= params.body.filters');
        console.log(params.body);
        fetch(endpoint, params)
            .then((res) => {
                if (res.status === 200) {
                    console.log('DEBUG ======= res');
                    console.log(res);
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
}