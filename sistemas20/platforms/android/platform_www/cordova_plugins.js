cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-firebase-lib.FirebasePlugin",
      "file": "plugins/cordova-plugin-firebase-lib/www/firebase.js",
      "pluginId": "cordova-plugin-firebase-lib",
      "clobbers": [
        "FirebasePlugin"
      ]
    },
    {
      "id": "cordova-plugin-firebase-messaging.FirebaseMessaging",
      "file": "plugins/cordova-plugin-firebase-messaging/www/FirebaseMessaging.js",
      "pluginId": "cordova-plugin-firebase-messaging",
      "merges": [
        "cordova.plugins.firebase.messaging"
      ]
    },
    {
      "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
      "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
      "pluginId": "cordova-plugin-firebase-authentication",
      "merges": [
        "cordova.plugins.firebase.auth"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-firebase-lib": "5.1.1",
    "cordova-plugin-androidx": "1.0.2",
    "cordova-plugin-androidx-adapter": "1.1.0",
    "cordova-support-android-plugin": "1.0.2",
    "cordova-support-google-services": "1.4.0",
    "cordova-plugin-firebase-messaging": "4.0.1",
    "cordova-plugin-firebase-authentication": "3.3.0"
  };
});