(function () {
    'use strict';

    function LeasingRequestService(signService, utilityService, validateService) {
        function buildStartLeasingSignatureData (startLeasing, senderPublicKey) {
            return [].concat(
                signService.getStartLeasingTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getRecipientBytes(startLeasing.recipient),
                signService.getAmountBytes(startLeasing.amount.toCoins()),
                signService.getFeeBytes(startLeasing.fee.toCoins()),
                signService.getTimestampBytes(startLeasing.time)
            );
        }

        this.buildStartLeasingRequest = function (startLeasing, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            startLeasing.time = startLeasing.time || currentTimeMillis;
            startLeasing.recipient = utilityService.resolveAddressOrAlias(startLeasing.recipient);

            var signatureData = buildStartLeasingSignatureData(startLeasing, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                recipient: startLeasing.recipient,
                amount: startLeasing.amount.toCoins(),
                timestamp: startLeasing.time,
                fee: startLeasing.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };

        function buildCancelLeasingSignatureData (cancelLeasing, senderPublicKey) {
            return [].concat(
                signService.getCancelLeasingTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getFeeBytes(cancelLeasing.fee.toCoins()),
                signService.getTimestampBytes(cancelLeasing.time),
                signService.getTransactionIdBytes(cancelLeasing.startLeasingTransactionId)
            );
        }

        this.buildCancelLeasingRequest = function (cancelLeasing, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            cancelLeasing.time = cancelLeasing.time || currentTimeMillis;

            var signatureData = buildCancelLeasingSignatureData(cancelLeasing, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                txId: cancelLeasing.startLeasingTransactionId,
                timestamp: cancelLeasing.time,
                fee: cancelLeasing.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };
    }

    LeasingRequestService.$inject = ['signService', 'utilityService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('leasingRequestService', LeasingRequestService);
})();
