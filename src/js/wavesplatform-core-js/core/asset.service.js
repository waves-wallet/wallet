(function () {
    'use strict';

    function AssetService(signService, validateService, utilityService, cryptoService) {
        function buildId(transactionBytes) {
            var hash = cryptoService.blake2b(new Uint8Array(transactionBytes));
            return cryptoService.base58.encode(hash);
        }

        function buildCreateAssetSignatureData (asset, tokensQuantity, senderPublicKey) {
            return [].concat(
                signService.getAssetIssueTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAssetNameBytes(asset.name),
                signService.getAssetDescriptionBytes(asset.description),
                signService.getAssetQuantityBytes(tokensQuantity),
                signService.getAssetDecimalPlacesBytes(asset.decimalPlaces),
                signService.getAssetIsReissuableBytes(asset.reissuable),
                signService.getFeeBytes(asset.fee.toCoins()),
                signService.getTimestampBytes(asset.time)
            );
        }

        this.createAssetIssueTransaction = function (asset, sender) {
            validateService.validateAssetIssue(asset);
            validateService.validateSender(sender);

            asset.time = asset.time || utilityService.getTime();
            asset.reissuable = angular.isDefined(asset.reissuable) ? asset.reissuable : false;
            asset.description = asset.description || '';

            var assetCurrency = Currency.create({
                displayName: asset.name,
                precision: asset.decimalPlaces
            });

            var tokens = new Money(asset.totalTokens, assetCurrency);
            var signatureData = buildCreateAssetSignatureData(asset, tokens.toCoins(), sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                id: buildId(signatureData),
                name: asset.name,
                description: asset.description,
                quantity: tokens.toCoins(),
                decimals: Number(asset.decimalPlaces),
                reissuable: asset.reissuable,
                timestamp: asset.time,
                fee: asset.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };

        function buildCreateAssetTransferSignatureData(transfer, senderPublicKey) {
            return [].concat(
                signService.getAssetTransferTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAssetIdBytes(transfer.amount.currency.id),
                signService.getFeeAssetIdBytes(transfer.fee.currency.id),
                signService.getTimestampBytes(transfer.time),
                signService.getAmountBytes(transfer.amount.toCoins()),
                signService.getFeeBytes(transfer.fee.toCoins()),
                signService.getRecipientBytes(transfer.recipient),
                signService.getAttachmentBytes(transfer.attachment)
            );
        }

        this.createAssetTransferTransaction = function (transfer, sender) {
            validateService.validateAssetTransfer(transfer);
            validateService.validateSender(sender);

            transfer.time = transfer.time || utilityService.getTime();
            transfer.attachment = transfer.attachment || [];
            transfer.recipient = utilityService.resolveAddressOrAlias(transfer.recipient);

            var signatureData = buildCreateAssetTransferSignatureData(transfer, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                id: buildId(signatureData),
                recipient: transfer.recipient,
                timestamp: transfer.time,
                assetId: transfer.amount.currency.id,
                amount: transfer.amount.toCoins(),
                fee: transfer.fee.toCoins(),
                feeAssetId: transfer.fee.currency.id,
                senderPublicKey: sender.publicKey,
                signature: signature,
                attachment: cryptoService.base58.encode(transfer.attachment)
            };
        };

        function buildCreateAssetReissueSignatureData(reissue, senderPublicKey) {
            return [].concat(
                signService.getAssetReissueTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAssetIdBytes(reissue.totalTokens.currency.id, true),
                signService.getAssetQuantityBytes(reissue.totalTokens.toCoins()),
                signService.getAssetIsReissuableBytes(reissue.reissuable),
                signService.getFeeBytes(reissue.fee.toCoins()),
                signService.getTimestampBytes(reissue.time)
            );
        }

        this.createAssetReissueTransaction = function (reissue, sender) {
            validateService.validateAssetReissue(reissue);
            validateService.validateSender(sender);

            reissue.reissuable = angular.isDefined(reissue.reissuable) ? reissue.reissuable : false;
            reissue.time = reissue.time || utilityService.getTime();

            var signatureData = buildCreateAssetReissueSignatureData(reissue, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                id: buildId(signatureData),
                assetId: reissue.totalTokens.currency.id,
                quantity: reissue.totalTokens.toCoins(),
                reissuable: reissue.reissuable,
                timestamp: reissue.time,
                fee: reissue.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };
    }

    AssetService.$inject = ['signService', 'validateService', 'utilityService', 'cryptoService'];

    angular
        .module('waves.core.services')
        .service('assetService', AssetService);
})();
