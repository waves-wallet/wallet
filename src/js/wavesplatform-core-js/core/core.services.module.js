(function() {
    'use strict';

    angular.module('waves.core.services', ['waves.core', 'restangular'])
        .config(function () {
            if (!String.prototype.startsWith) {
                Object.defineProperty(String.prototype, 'startsWith', {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: function(searchString, position) {
                        position = position || 0;
                        return this.lastIndexOf(searchString, position) === position;
                    }
                });
            }

            if (typeof String.prototype.endsWith !== 'function') {
                String.prototype.endsWith = function(suffix) {
                    return this.indexOf(suffix, this.length - suffix.length) !== -1;
                };
            }
        });
})();
