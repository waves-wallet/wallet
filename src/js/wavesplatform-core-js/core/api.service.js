(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('apiService', ['Restangular', 'cryptoService', function (rest, cryptoService) {
            var blocksApi = rest.all('blocks');

            this.blocks = {
                height: function() {
                    return blocksApi.get('height');
                },
                last: function() {
                    return blocksApi.get('last');
                },
                list: function (startHeight, endHeight) {
                    return blocksApi.one('seq', startHeight).all(endHeight).getList();
                }
            };

            var addressApi = rest.all('addresses');
            var consensusApi = rest.all('consensus');
            this.address = {
                balance: function (address) {
                    return addressApi.one('balance', address).get();
                },
                effectiveBalance: function (address) {
                    return addressApi.one('effectiveBalance', address).get();
                },
                generatingBalance: function (address) {
                    return consensusApi.one('generatingbalance', address).get();
                }
            };

            var transactionApi = rest.all('transactions');

            var request;
            var timer;
            this.transactions = {
                unconfirmed: function () {
                    if (!request) {
                        request = transactionApi.all('unconfirmed').getList();
                    } else {
                        if (!timer) {
                            timer = setTimeout(function () {
                                request = transactionApi.all('unconfirmed').getList();
                                request.finally(function () {
                                    timer = null;
                                });
                            }, 10000);
                        }
                    }
                    return request;
                },
                list: function (address, max) {
                    max = max || 50;
                    return transactionApi.one('address', address).one('limit', max).getList();
                },
                info: function (transactionId) {
                    return transactionApi.one('info', transactionId).get();
                }
            };

            var leasingApi = rest.all('leasing').all('broadcast');
            this.leasing = {
                lease: function (signedStartLeasingTransaction) {
                    return leasingApi.all('lease').post(signedStartLeasingTransaction);
                },
                cancel: function (signedCancelLeasingTransaction) {
                    return leasingApi.all('cancel').post(signedCancelLeasingTransaction);
                }
            };

            var aliasApi = rest.all('alias');
            this.alias = {
                create: function (signedCreateAliasTransaction) {
                    return aliasApi.all('broadcast').all('create').post(signedCreateAliasTransaction);
                },
                getByAddress: function (address) {
                    return aliasApi.all('by-address').get(address).then(function (response) {
                        return response.map(function (alias) {
                            return alias.slice(8);
                        });
                    });
                }
            };

            var assetApi = rest.all('assets');
            var assetBroadcastApi = assetApi.all('broadcast');
            this.assets = {
                balance: function (address, assetId) {
                    var rest = assetApi.all('balance');
                    if (assetId)
                        return rest.all(address).get(assetId);
                    else
                        return rest.get(address);
                },
                issue: function (signedAssetIssueTransaction) {
                    return assetBroadcastApi.all('issue').post(signedAssetIssueTransaction);
                },
                reissue: function (signedAssetReissueTransaction) {
                    return assetBroadcastApi.all('reissue').post(signedAssetReissueTransaction);
                },
                transfer: function (signedAssetTransferTransaction) {
                    return assetBroadcastApi.all('transfer').post(signedAssetTransferTransaction);
                },
                massPay: function (signedTransactions) {
                    return assetBroadcastApi.all('batch-transfer').post(signedTransactions);
                },
                makeAssetNameUnique: function (signedMakeAssetNameUniqueTransaction) {
                    return assetApi
                        .all('broadcast')
                        .all('make-asset-name-unique')
                        .post(signedMakeAssetNameUniqueTransaction);
                },
                isUniqueName: function (assetName) {
                    assetName = cryptoService.base58.encode(converters.stringToByteArray(assetName));
                    return assetApi
                        .all('asset-id-by-unique-name')
                        .get(assetName)
                        .then(function (response) {
                            // FIXME : temporary fix for the API format
                            if (typeof response !== 'object') {
                                response = {assetId: response};
                            }

                            return response.assetId;
                        });
                }
            };
        }]);
})();
