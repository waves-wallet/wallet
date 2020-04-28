/**
 * @author Björn Wenzel
 */
(function () {
    'use strict';
    describe('formatting service test', function () {
        var formattingService, $window, lang = 'de-DE';

        // set before initialization the userLanguage
        beforeEach(function () {
            window.navigator.userLanguage = lang;
        });

        beforeEach(module('waves.core.services'));

        beforeEach(inject(function (_formattingService_, _$window_) {
            formattingService = _formattingService_;
            $window = _$window_;
        }));

        var offsetSummer = new Date(1474634465425).getTimezoneOffset() * 60 * 1000;
        var offsetWinter = new Date(1262311350000).getTimezoneOffset() * 60 * 1000;

        it('should return formatted date', function () {
            var timestamp = 1474634465425 + offsetSummer;
            var formatedDate = formattingService.formatTimestamp(timestamp, undefined, true);
            expect(formatedDate).toEqual('23.09.2016 12:41:05');

            // 23.09.2016
            // 12:41:05
        });

        it('should return only date', function () {
            var timestamp = 1474634465425 + offsetSummer;
            var formatedDate = formattingService.formatTimestamp(timestamp, true);
            expect(formatedDate).toEqual('23.09.2016');
        });

        it('should return date by date', function () {
            var time = new Date(1474634465425 + offsetSummer);
            var formatedDate = formattingService.formatTimestamp(time, true);
            expect(formatedDate).toEqual('23.09.2016');
        });

        it('should return date with filled 0', function () {
            var time = new Date(1262307750000 + offsetWinter);
            var formatedDate = formattingService.formatTimestamp(time, false);
            expect(formatedDate).toEqual('01.01.2010 1:02:30');
        });

        describe('should return date by th-TH', function () {
            // this test is only needed to change the userLanguage before next test
            it('should change userLanguage before test', function () {
                lang = 'th-TH';
                expect(true).toEqual(true);
            });

            it('should return date with filled 0 by th-TH', function () {
                var time = new Date(1262307750000 + offsetWinter);
                var formatedDate = formattingService.formatTimestamp(time, false);
                expect(formatedDate).toEqual('1/1/2010 1:02:30');
            });
        });

    });
})();
