(function () {
    'use strict';

    var SELL_ORDER_TYPE = 'sell';

    function MatcherRequestService(signService, utilityService, validateService) {
        function buildCreateOrderSignatureData(order, senderPublicKey) {
            return [].concat(
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getPublicKeyBytes(order.matcherKey),
                signService.getAssetIdBytes(order.price.amountAsset.id),
                signService.getAssetIdBytes(order.price.priceAsset.id),
                signService.getOrderTypeBytes(order.orderType === SELL_ORDER_TYPE),
                signService.getAmountBytes(order.price.toBackendPrice()),
                signService.getAmountBytes(order.amount.toCoins()),
                signService.getTimestampBytes(order.time),
                signService.getTimestampBytes(order.expiration),
                signService.getFeeBytes(order.fee.toCoins())
            );
        }

        this.buildCreateOrderRequest = function (order, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            order.time = order.time || currentTimeMillis;

            var date = new Date(currentTimeMillis);
            order.expiration = order.expiration || date.setDate(date.getDate() + 20);

            var signatureData = buildCreateOrderSignatureData(order, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                orderType: order.orderType,
                assetPair: {
                    amountAsset: order.price.amountAsset.id,
                    priceAsset: order.price.priceAsset.id
                },
                price: order.price.toBackendPrice(),
                amount: order.amount.toCoins(),
                timestamp: order.time,
                expiration: order.expiration,
                matcherFee: order.fee.toCoins(),
                matcherPublicKey: order.matcherKey,
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };

        function buildCancelOrderSignatureData(orderId, senderPublicKey) {
            return [].concat(
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getOrderIdBytes(orderId)
            );
        }

        this.buildCancelOrderRequest = function (orderId, sender) {
            validateService.validateSender(sender);

            if (!orderId) {
                throw new Error('orderId hasn\'t been set');
            }

            var signatureData = buildCancelOrderSignatureData(orderId, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                sender: sender.publicKey,
                orderId: orderId,
                signature: signature
            };
        };
    }

    MatcherRequestService.$inject = ['signService', 'utilityService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('matcherRequestService', MatcherRequestService);
})();
