(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('addressService', ['constants.address', function (constants) {
            this.cleanupOptionalPrefix = function(displayAddress) {
                if (displayAddress.length <= 30) {
                    // Don't change aliases
                    return displayAddress;
                }

                var address = displayAddress,
                    prefixLen = constants.ADDRESS_PREFIX.length;

                if (address.length > constants.RAW_ADDRESS_LENGTH || address.startsWith(constants.ADDRESS_PREFIX)) {
                    address = address.substr(prefixLen, address.length - prefixLen);
                }

                return address;
            };

            this.validateAddress = function(address) {
                var cleanAddress = this.cleanupOptionalPrefix(address);
                return constants.MAINNET_ADDRESS_REGEXP.test(cleanAddress);
            };
        }]);
})();
