
//////////////////// CONFIG APP

import Constants from 'expo-constants';

const isStandAloneApp = Constants.appOwnership == "standalone";


const ConfigApp = {

    // backend url
    URL: "https://beta.lazyketo.app/",
    
    // facebook page url
    FACEBOOK: "https://facebook.com",

    // youtube page url
    YOUTUBE: "https://youtube.com",

    // twitter page url
    TWITTER: "https://twitter.com",

    // twitter page url
    INSTAGRAM: "https://instagram.com",

    // banner admob unit id
    BANNER_ID: "ca-app-pub-4232853679195184/4472153551",

    // testdevice id, DON'T CHANGE IT
    TESTDEVICE_ID : isStandAloneApp?"EMULATOR" : "EMULATOR",

    IOS_INTERSTITIAL_ID: 'ca-app-pub-3940256099942544/1033173712',
    
    ANDROID_INTERSTITIAL_ID: 'ca-app-pub-3940256099942544/1033173712',

    INTERSTITIAL_COUNT: '5',

    //REMOTE_TEST: awesomeNewFeature,


};

export default ConfigApp;
