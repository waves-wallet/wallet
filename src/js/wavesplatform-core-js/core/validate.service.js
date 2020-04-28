(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('validateService', function () {
            var self = this;

            self.validateSender = function (sender) {
                if (!sender) {
                    throw new Error('Sender hasn\'t been set');
                }

                if (!sender.publicKey) {
                    throw new Error('Sender account public key hasn\'t been set');
                }

                if (!sender.privateKey) {
                    throw new Error('Sender account private key hasn\'t been set');
                }
            };

            self.validateAssetIssue = function (issue) {
                if (angular.isUndefined(issue.name)) {
                    throw new Error('Asset name hasn\'t been set');
                }

                if (angular.isUndefined(issue.totalTokens)) {
                    throw new Error('Total tokens amount hasn\'t been set');
                }

                if (angular.isUndefined(issue.decimalPlaces)) {
                    throw new Error('Token decimal places amount hasn\'t been set');
                }

                if (issue.fee.currency !== Currency.WAVES) {
                    throw new Error('Transaction fee must be nominated in Waves');
                }
            };

            self.validateAssetTransfer = function (transfer) {
                if (angular.isUndefined(transfer.recipient)) {
                    throw new Error('Recipient account hasn\'t been set');
                }

                if (angular.isUndefined(transfer.fee)) {
                    throw new Error('Transaction fee hasn\'t been set');
                }

                if (angular.isUndefined(transfer.amount)) {
                    throw new Error('Transaction amount hasn\'t been set');
                }
            };

            self.validateAssetReissue = function (reissue) {
                if (reissue.totalTokens.currency === Currency.WAVES) {
                    throw new Error('Reissuing Waves is not allowed.');
                }

                if (angular.isUndefined(reissue.totalTokens)) {
                    throw new Error('Total tokens amount hasn\'t been set');
                }

                if (angular.isUndefined(reissue.fee)) {
                    throw new Error('Transaction fee hasn\'t been set');
                }

                if (reissue.fee.currency !== Currency.WAVES) {
                    throw new Error('Transaction fee must be nominated in Waves');
                }
            };
        });
})();
