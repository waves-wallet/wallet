(function() {
    'use strict';

    var STORAGE_STRUCTURE_VERSION = 1;

    angular
        .module('waves.core.services')
        .provider('storageService', [function () {
            function getStorageVersion () {
                return STORAGE_STRUCTURE_VERSION;
            }

            function isLocalStorageEnabled(window) {
                var storage, fail, uid;
                try {
                    uid = String(new Date());
                    (storage = window.localStorage).setItem(uid, uid);
                    fail = storage.getItem(uid) != uid;
                    if (!fail)
                        storage.removeItem(uid);
                    else
                        storage = false;
                }
                catch (exception) {
                }
                return storage;
            }

            this.$get = ['$window', 'chromeStorageService', 'html5StorageService',
                function($window, chromeStorageService, html5StorageService) {
                    var result = isLocalStorageEnabled($window) ? html5StorageService : chromeStorageService;
                    result.getStorageVersion = getStorageVersion;

                    return result;
                }];
        }]);
})();
