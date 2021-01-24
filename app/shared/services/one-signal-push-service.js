import {ONE_SIGNAL_API_KEY, ONE_SIGNAL_APP_ID} from "../util/constants";
import OneSignal from 'react-native-onesignal';

function myiOSPromptCallback(permission){
    // do something with permission value
}
export default class BeInvestorOneSignalPushService {
    initializeOneSignalSystem() {
        //Remove this method to stop OneSignal Debugging
        OneSignal.setLogLevel(6, 0);
        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init(ONE_SIGNAL_APP_ID);
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.


        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }
    setOneSignalListenerOff() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }
    static sendNotification(data) {
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`
        };

        let endpoint = "https://onesignal.com/api/v1/notifications";

        let params = {
            method: 'POST',
            headers: headers,
            port: 443,
            body: JSON.stringify({
                app_id: ONE_SIGNAL_APP_ID,
                included_segments: ['Test Users'],
                headings: {en: 'Message sur BeInvestor', fr: 'Message sur BeInvestor'},
                contents: {en: data, fr: data}
            })
        };

        fetch(endpoint, params)
            .then((res) => {
                console.log('RES FROM FETCH :');
                console.log(res)
            })
            .catch((reject) => {
                console.error('ERROR IN SEND NOTIFICATION FETCH ONE SIGNAL : ');
                console.error(reject)
            });
    };
}