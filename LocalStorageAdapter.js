angular.module('LocalStorageAdapter', ["general.config"])
.factory('LocalStorageAdapter', function(GENERAL_CONFIG) {

    var Storage = localStorage,
        APP_NAME = (GENERAL_CONFIG.APP_NAME + "_"),
        empty = function(){
            try {
                if(arguments.length === 0)return true;
                for(var i = 0; i<arguments.length; ++i)
                    if(!arguments[i])
                        return true;
                    else
                        if((arguments[i] instanceof Array) && arguments[i].length === 0)
                            return true;
                        else if(typeof(arguments[i]) === "object" && Object.keys(arguments[i]).length === 0)
                            return true;
                        else if(typeof(arguments[i]) === "string" && arguments[i] === "")
                            return true;
                        else if(typeof(arguments[i]) === "number" && arguments[i] === "")
                            return true;
                return false;
            } catch(e) {
                return true;
            }
        };
        
    return {
        set: function(k, v) {
            k = (APP_NAME + k);
            if(arguments.length !== 2)
                return false;
            if(v && typeof(v) !== "string")var v = JSON.stringify(v);
            return Storage.setItem(k, v);
        },
        get: function(k) {
            k = (APP_NAME + k);
            if (arguments.length !== 1)
                return false;
            var result = Storage.getItem(k);
            if(result === null)return false;
            return result.match(/\[.*\]|\{.*\}/)
                ? JSON.parse(result)
                : result;
            return false;
        },
        array_push : function(k, v){
            var current_value = this.get(k);
            if(empty(current_value))
                current_value = [];
            else if(!(current_value instanceof Array))
                return false;
            current_value.push(v);
            return this.set(k, current_value); 
        },
        clear: function(item) {
            return (arguments.length === 1 ? Storage.removeItem(APP_NAME + item) : Storage.clear());
        }
    };

});