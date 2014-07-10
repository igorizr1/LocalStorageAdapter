(function() {
    var
    config_data = {
        GENERAL_CONFIG: {
            APP_NAME: "MovieFish"
        }
    },
    /* set settings */
    config_module = angular.module('general.config', []);
    angular.forEach(config_data, function(key, value) {
        config_module.constant(value, key);
    });
}());