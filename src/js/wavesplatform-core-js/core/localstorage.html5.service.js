(function() {
    'use strict';

    angular
        .module('waves.core.services')
        .service('html5StorageService', ['constants.network', '$window', '$q', function(constants, window, $q) {
            if (angular.isUndefined(constants.NETWORK_NAME))
                throw new Error('Network name hasn\'t been configured');

            var $key = 'Waves' + constants.NETWORK_NAME;

            this.saveState = function(state) {
                var serialized = angular.toJson(state);

                window.localStorage.setItem($key, serialized);

                return $q.when();
            };

            this.loadState = function() {
                var data;
                var serialized = window.localStorage.getItem($key);

                if (serialized) {
                    data = angular.fromJson(serialized);
                }

                return $q.when(data);
            };

            this.clear = function() {
                window.localStorage.removeItem($key);

                return $q.when();
            };
        }]);
})();
