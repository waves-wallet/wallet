(function() {
    'use strict';

    angular
        .module('waves.core.services')
        .service('chromeStorageService', ['$q', function ($q) {
            var $key = 'WavesAccounts';
            var self = this;

            self.saveState = function (state) {
                var deferred = $q.defer();
                var json = {};
                json[$key] = state;

                chrome.storage.local.set(json, function () {
                    deferred.resolve();
                });

                return deferred.promise;
            };

            self.loadState = function () {
                var deferred = $q.defer();

                self.loadSyncState().then(function (syncState) {
                    if (syncState) {
                        self.saveState(syncState)
                            .then(function () {
                                return self.clearSyncState();
                            })
                            .then(function () {
                                deferred.resolve(syncState);
                            });
                    } else {
                        chrome.storage.local.get($key, function (data) {
                            deferred.resolve(data[$key]);
                        });
                    }
                });

                return deferred.promise;
            };

            self.loadSyncState = function () {
                var deferred = $q.defer();

                chrome.storage.sync.get($key, function (data) {
                    deferred.resolve(data[$key]);
                });

                return deferred.promise;
            };

            self.clearSyncState = function () {
                var deferred = $q.defer();

                chrome.storage.sync.clear(function () {
                    deferred.resolve();
                });

                return deferred.promise;
            };
        }]);
})();
