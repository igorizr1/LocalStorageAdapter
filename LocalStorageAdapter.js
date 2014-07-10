angular.module('LocalStorageAdapter', ["general.config"])
.factory('LocalStorageAdapter', function(GENERAL_CONFIG) {

    var Storage = localStorage,
        APP_NAME = (GENERAL_CONFIG.APP_NAME + "_");
        
    return {
        set: function(k, v) {
            k = (APP_NAME + k);
            if (arguments.length !== 2)
                return false;
            if (v && typeof(v) !== "string") {
                var v = JSON.stringify(v);
            }
            return Storage.setItem(k, v);
        },
        get: function(k) {
            k = (APP_NAME + k);
            if (arguments.length !== 1)
                return false;
            var result = Storage.getItem(k);
            if (result === null)
                return false;
            if (result.match(/\[.*\]|\{.*\}/)) {
                return JSON.parse(result);
            } else {
                return result;
            }
            return false;
        },
        clear: function(item) {
            return (arguments.length === 1 ? Storage.removeItem(APP_NAME + item) : Storage.clear());
        }
    };

});