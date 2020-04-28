(function () {
    'use strict';

    var BASE58_REGEX = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{0,}$');

    angular
        .module('waves.core.services')
        .service('utilityService', ['constants.network', 'cryptoService', function (constants, cryptoService) {
            var self = this;

            self.getNetworkIdByte = function () {
                return constants.NETWORK_CODE.charCodeAt(0) & 0xFF;
            };

            // long to big-endian bytes
            self.longToByteArray = function (value) {
                var bytes = new Array(7);
                for (var k = 7; k >= 0; k--) {
                    bytes[k] = value & (255);
                    value = value / 256;
                }

                return bytes;
            };

            // short to big-endian bytes
            self.shortToByteArray = function (value) {
                return converters.int16ToBytes(value, true);
            };

            self.base58StringToByteArray = function (base58String) {
                var decoded = cryptoService.base58.decode(base58String);
                var result = [];
                for (var i = 0; i < decoded.length; ++i) {
                    result.push(decoded[i] & 0xff);
                }

                return result;
            };

            self.stringToByteArrayWithSize = function (string) {
                var bytes = converters.stringToByteArray(string);
                return self.byteArrayWithSize(bytes);
            };

            self.byteArrayWithSize = function (byteArray) {
                var result = self.shortToByteArray(byteArray.length);
                return result.concat(byteArray);
            };

            self.booleanToBytes = function (flag) {
                return flag ? [1] : [0];
            };

            self.endsWithWhitespace = function (value) {
                return /\s+$/g.test(value);
            };

            self.getTime = function() {
                return Date.now();
            };

            self.isValidBase58String = function (input) {
                return BASE58_REGEX.test(input);
            };

            // Add a prefix in case of alias
            self.resolveAddressOrAlias = function (string) {
                if (string.length <= 30) {
                    return 'alias:' + constants.NETWORK_CODE + ':' + string;
                } else {
                    return string;
                }
            };
        }]);
})();
