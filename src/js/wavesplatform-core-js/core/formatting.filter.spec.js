/**
 * @author Björn Wenzel
 */
(function () {
    'use strict';
    describe('Formatting filter test', function () {
        var formattingFilter;
        var $window = {
            navigator: {
                userLanguage: 'de-DE'
            }
        };

        beforeEach(function () {
            angular.mock.module('waves.core.services', function ($provide) {
                $provide.value('$window', $window);
            });
        });
        beforeEach(module('waves.core.filter'));
        beforeEach(inject(function (_formattingFilter_) {
            formattingFilter = _formattingFilter_;
        }));

        var offsetSummer = new Date(1474634465425).getTimezoneOffset() * 60 * 1000;
        var offsetWinter = new Date(1262311350000).getTimezoneOffset() * 60 * 1000;

        it('should parse timestamp and format date', function () {
            expect(formattingFilter(1474634465425 + offsetSummer)).toEqual('23.09.2016 12:41:05');
        });

        it('should handle timestamp and return formatted date only', function () {
            expect(formattingFilter(1474634465425 + offsetSummer, true)).toEqual('23.09.2016');
        });

        it('should handle date and return formatted date only', function () {
            var time = new Date(1474634465425 + offsetSummer);
            expect(formattingFilter(time, true)).toEqual('23.09.2016');
        });

        it('should handle date and return formatted time only', function () {
            var time = new Date(1262307750000 + offsetWinter);
            expect(formattingFilter(time, false)).toEqual('01.01.2010 1:02:30');
        });
    });
})();
