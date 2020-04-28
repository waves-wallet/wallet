(function () {
    'use strict';

    function AliasRequestService(signService, utilityService, validateService) {
        function buildCreateAliasSignatureData (alias, senderPublicKey) {
            return [].concat(
                signService.getCreateAliasTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAliasBytes(alias.alias),
                signService.getFeeBytes(alias.fee.toCoins()),
                signService.getTimestampBytes(alias.time)
            );
        }

        this.buildCreateAliasRequest = function (alias, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            alias.time = alias.time || currentTimeMillis;

            var signatureData = buildCreateAliasSignatureData(alias, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                alias: alias.alias,
                timestamp: alias.time,
                fee: alias.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };
    }

    AliasRequestService.$inject = ['signService', 'utilityService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('aliasRequestService', AliasRequestService);
})();
