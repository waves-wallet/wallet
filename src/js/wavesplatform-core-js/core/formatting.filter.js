/**
 * @author Björn Wenzel
 */
(function () {
    'use strict';
    angular.module('waves.core.filter')
        .filter('formatting', ['formattingService', function (formattingService) {
            return function(timestamp, dateOnly) {
                if (angular.isUndefined(dateOnly)) {
                    dateOnly = false;
                }

                return formattingService.formatTimestamp(timestamp, dateOnly);
            };
        }]);
})();
