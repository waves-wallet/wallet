(function () {
    'use strict';

    var WAVES_ASSET_ID = 'WAVES',
        WAVES_PRECISION = 8;

    function denormalizeId(id) {
        return id === WAVES_ASSET_ID ? '' : id;
    }

    function normalizeId(id) {
        return id ? id : WAVES_ASSET_ID;
    }

    function MatcherApiService(rest, utilityService, cryptoService, validateService) {
        var apiRoot = rest.all('matcher');
        var orderbookRoot = apiRoot.all('orderbook');

        this.createOrder = function (signedOrderRequest) {
            return orderbookRoot.post(signedOrderRequest);
        };

        this.cancelOrder = function (firstAssetId, secondAssetId, signedCancelRequest) {
            return orderbookRoot
                .all(normalizeId(firstAssetId))
                .all(normalizeId(secondAssetId))
                .all('cancel')
                .post(signedCancelRequest);
        };

        this.deleteOrder = function (firstAssetId, secondAssetId, signedCancelRequest) {
            return orderbookRoot
                .all(normalizeId(firstAssetId))
                .all(normalizeId(secondAssetId))
                .all('delete')
                .post(signedCancelRequest);
        };

        this.orderStatus = function (firstAssetId, secondAssetId, orderId) {
            return orderbookRoot
                .all(normalizeId(firstAssetId))
                .all(normalizeId(secondAssetId))
                .get(orderId);
        };

        this.loadMatcherKey = function () {
            return apiRoot.get('');
        };

        this.loadOrderbook = function (firstAssetId, secondAssetId) {
            return orderbookRoot.all(normalizeId(firstAssetId)).get(normalizeId(secondAssetId))
                .then(function (response) {
                    response.pair.amountAsset = denormalizeId(response.pair.amountAsset);
                    response.pair.priceAsset = denormalizeId(response.pair.priceAsset);

                    return response;
                });
        };

        function buildLoadUserOrdersSignature(timestamp, sender) {
            validateService.validateSender(sender);

            var publicKeyBytes = utilityService.base58StringToByteArray(sender.publicKey),
                timestampBytes = utilityService.longToByteArray(timestamp),
                signatureData = [].concat(publicKeyBytes, timestampBytes),

                privateKeyBytes = cryptoService.base58.decode(sender.privateKey);

            return cryptoService.nonDeterministicSign(privateKeyBytes, signatureData);
        }

        this.loadUserOrders = function (amountAsset, priceAsset, sender) {
            var timestamp = Date.now(),
                signature = buildLoadUserOrdersSignature(timestamp, sender);

            return orderbookRoot
                .all(normalizeId(amountAsset))
                .all(normalizeId(priceAsset))
                .all('publicKey')
                .get(sender.publicKey, {}, {
                    Timestamp: timestamp,
                    Signature: signature
                });
        };

        this.loadAllMarkets = function () {
            return orderbookRoot.get('').then(function (response) {
                var pairs = [];
                _.forEach(response.markets, function (market) {
                    var id = normalizeId(market.amountAsset) + '/' + normalizeId(market.priceAsset);
                    var pair = {
                        id: id,
                        amountAssetInfo: market.amountAssetInfo,
                        amountAsset: Currency.create({
                            id: denormalizeId(market.amountAsset),
                            displayName: market.amountAssetName,
                            precision: market.amountAssetInfo ? market.amountAssetInfo.decimals : WAVES_PRECISION
                        }),
                        priceAssetInfo: market.priceAssetInfo,
                        priceAsset: Currency.create({
                            id: denormalizeId(market.priceAsset),
                            displayName: market.priceAssetName,
                            precision: market.priceAssetInfo ? market.priceAssetInfo.decimals : WAVES_PRECISION
                        }),
                        created: market.created
                    };
                    pairs.push(pair);
                });

                return pairs;
            });
        };

        this.getTradableBalance = function (amountAsset, priceAsset, address) {
            var normAmountAsset = normalizeId(amountAsset),
                normPriceAsset = normalizeId(priceAsset);

            return orderbookRoot
                .all(normAmountAsset)
                .all(normPriceAsset)
                .all('tradableBalance')
                .get(address)
                .then(function (response) {
                    var result = {};
                    result[denormalizeId(normAmountAsset)] = response[normAmountAsset];
                    result[denormalizeId(normPriceAsset)] = response[normPriceAsset];
                    return result;
                });
        };
    }

    MatcherApiService.$inject = ['MatcherRestangular', 'utilityService', 'cryptoService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('matcherApiService', MatcherApiService);
})();
