(function () {
    'use strict';

    var MINUTE = 60 * 1000,
        DEFAULT_FRAME = 30,
        DEFAULT_LIMIT = 50;

    function serializeId(id) {
        return id === '' ? 'WAVES' : id;
    }

    function DatafeedApiService(rest) {
        var self = this,
            apiRoot = rest.all('api');

        self.getSymbols = function () {
            return apiRoot.get('symbols');
        };

        self.getCandles = function (pair, from, to, frame) {
            frame = frame || DEFAULT_FRAME;
            to = to || Date.now();
            from = from || to - 50 * frame * MINUTE;

            return apiRoot
                .all('candles')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .all(frame)
                .all(from)
                .get(to);
        };

        self.getLastCandles = function (pair, limit, frame) {
            frame = frame || DEFAULT_FRAME;
            limit = limit || DEFAULT_LIMIT;

            return apiRoot
                .all('candles')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .all(frame)
                .get(limit);
        };

        self.getTrades = function (pair, limit) {
            limit = limit || DEFAULT_LIMIT;

            return apiRoot
                .all('trades')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .get(limit);
        };

        self.getTradesByAddress = function (pair, address, limit) {
            limit = limit || DEFAULT_LIMIT;

            return apiRoot
                .all('trades')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .all(address)
                .get(limit);
        };
    }

    DatafeedApiService.$inject = ['DatafeedRestangular'];

    angular
        .module('waves.core.services')
        .service('datafeedApiService', DatafeedApiService);
})();
