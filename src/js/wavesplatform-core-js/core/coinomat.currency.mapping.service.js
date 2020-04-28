(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('coinomatCurrencyMappingService', [function () {
            function unsupportedCurrency(currency) {
                throw new Error('Unsupported currency: ' + currency.displayName);
            }

            /**
             * Currency codes for Waves Platform
             * @param {Currency} currency
             * @returns {string} currency code
             */
            this.platformCurrencyCode = function (currency) {
                switch (currency.id) {
                    case Currency.BTC.id:
                        return 'WBTC';

                    case Currency.WAVES.id:
                        return 'WAVES';

                    case Currency.ETH.id:
                        return 'WETH';

                    case Currency.LTC.id:
                        return 'WLTC';

                    case Currency.ZEC.id:
                        return 'WZEC';

                    case Currency.BCH.id:
                        return 'WBCH';
                }

                unsupportedCurrency(currency);
            };

            /**
             * Currency codes for Coinomat gateway
             * @param {Currency} currency
             * @returns {string} currency code
             */
            this.gatewayCurrencyCode = function (currency) {
                switch (currency.id) {
                    case Currency.BTC.id:
                        return 'BTC';

                    case Currency.WAVES.id:
                        return 'WAVES';

                    case Currency.ETH.id:
                        return 'ETH';

                    case Currency.LTC.id:
                        return 'LTC';

                    case Currency.ZEC.id:
                        return 'ZEC';

                    case Currency.BCH.id:
                        return 'BCH';
                }

                unsupportedCurrency(currency);
            };
        }]);
})();
