describe('Asset.Service', function() {
    var assetService, cryptoService;
    var sender = {
        publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
        privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
    };
    var asset = Currency.create({
        id: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
        displayName: 'Asset',
        precision: 2
    });

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    // Injection of dependencies
    beforeEach(inject(function($injector) {
        assetService = $injector.get('assetService');
        cryptoService = $injector.get('cryptoService');

        // changing non-deterministic signatures with deterministic ones
        // to always have the same transaction signature
        spyOn(cryptoService, 'nonDeterministicSign').and.callFake(function (privateKeyBytes, signatureData) {
            return cryptoService.deterministicSign(privateKeyBytes, signatureData);
        });
    }));

    it('should successfully sign issue transaction', function () {
        var transaction = {
            name: 'БАБЛОС',
            description: 'Some english words немного кириллических символов',
            time: 1478704158292,
            totalTokens: 100000000,
            decimalPlaces: 2,
            reissuable: true,
            fee: new Money(1, Currency.WAVES)
        };

        var actual = assetService.createAssetIssueTransaction(transaction, sender);

        expect(actual.timestamp).toEqual(transaction.time);
        expect(actual.name).toEqual(transaction.name);
        expect(actual.description).toEqual(transaction.description);
        expect(actual.quantity).toEqual(transaction.totalTokens * 100);
        expect(actual.decimals).toEqual(transaction.decimalPlaces);
        expect(actual.fee).toEqual(transaction.fee.toCoins());
        expect(actual.reissuable).toBe(true);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.signature)
            .toEqual('5ngquur4nqX1cVPK3Zaf9KqY1qNH6i7gF5EhaWeS8mZp1LADTVuPXmNUi12jeXSniGry5a7ThsMtWcC73pSU196o');
    });

    it('should successfully sign issue transaction with unset reissuable flag', function () {
        var transaction = {
            name: 'БАБЛОС',
            description: 'Some english words немного кириллических символов',
            time: 1478704158292,
            totalTokens: 100000000,
            decimalPlaces: 2,
            fee: new Money(1, Currency.WAVES)
        };

        var actual = assetService.createAssetIssueTransaction(transaction, sender);

        expect(actual.timestamp).toEqual(transaction.time);
        expect(actual.name).toEqual(transaction.name);
        expect(actual.description).toEqual(transaction.description);
        expect(actual.quantity).toEqual(transaction.totalTokens * 100);
        expect(actual.decimals).toEqual(transaction.decimalPlaces);
        expect(actual.fee).toEqual(transaction.fee.toCoins());
        expect(actual.reissuable).toBe(false);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.signature)
            .toEqual('51Bz36bKtWYGp4huyKiopnDXqkrMeG3NxPUYBoxkkL9QzGWrTsriwiZ6fScTJSjiNYM5WLmpxZGvvqBshwK2pDtf');
    });

    it('should successfully sign transfer transaction', function () {
        var transfer = {
            recipient: '3N9UuGeWuDt9NfWbC5oEACHyRoeEMApXAeq',
            time: 1478864678621,
            amount: new Money(10, asset),
            fee: new Money(0.001, Currency.WAVES)
        };

        var actual = assetService.createAssetTransferTransaction(transfer, sender);

        expect(actual.timestamp).toEqual(transfer.time);
        expect(actual.recipient).toEqual(transfer.recipient);
        expect(actual.assetId).toEqual(asset.id);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.amount).toEqual(transfer.amount.toCoins());
        expect(actual.fee).toEqual(transfer.fee.toCoins());
        expect(actual.attachment).toEqual('');
        expect(actual.signature)
            .toEqual('677UVgKBAVZdweVbn6wKhPLP9UxVSh3x4fBXPgepKoHtsV9nSd8HXBMxCdsYn41g3EE63bcihnUHwhXoSu9GZTLf');
    });

    it('should successfully sign transfer transaction with an alias', function () {
        var transfer = {
            recipient: 'test alias',
            time: 1478864678621,
            amount: new Money(10, asset),
            fee: new Money(0.001, Currency.WAVES)
        };

        var actual = assetService.createAssetTransferTransaction(transfer, sender);

        expect(actual.timestamp).toEqual(transfer.time);
        expect(actual.recipient).toEqual(transfer.recipient);
        expect(actual.assetId).toEqual(asset.id);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.amount).toEqual(transfer.amount.toCoins());
        expect(actual.fee).toEqual(transfer.fee.toCoins());
        expect(actual.attachment).toEqual('');
        expect(actual.signature)
            .toEqual('67FiDJsPcTo58PQXB4vwVAi5MVk7dQqYiEuiZUWyKJCfP89cd9zhJsu3cvGPEpaK71BsT4v42grpcYZYESS2AmZy');
    });

    it('should successfully sign asset reissue transaction', function () {
        var amount = new Money(1000000, asset);
        var reissue = {
            totalTokens: amount,
            reissuable: false,
            time: 1478868177862,
            fee: new Money(1, Currency.WAVES)
        };

        var actual = assetService.createAssetReissueTransaction(reissue, sender);

        expect(actual.timestamp).toEqual(reissue.time);
        expect(actual.quantity).toEqual(reissue.totalTokens.toCoins());
        expect(actual.fee).toEqual(reissue.fee.toCoins());
        expect(actual.reissuable).toBe(false);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.signature)
            .toEqual('4G81NzgHDwXdjqANGE2qxZrC5VpDA7ek3Db8v3iqunpkrXgAy7KBJgdHWUw1TEDBNewtjMJTvB9Po55PZ5d6ztCk');
    });

    it('should successfully sign asset reissue transaction with unset reissuable flag', function () {
        var amount = new Money(1000000, asset);
        var reissue = {
            totalTokens: amount,
            time: 1478868177862,
            fee: new Money(1, Currency.WAVES)
        };

        var actual = assetService.createAssetReissueTransaction(reissue, sender);

        expect(actual.timestamp).toEqual(reissue.time);
        expect(actual.quantity).toEqual(reissue.totalTokens.toCoins());
        expect(actual.fee).toEqual(reissue.fee.toCoins());
        expect(actual.reissuable).toBe(false);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.signature)
            .toEqual('4G81NzgHDwXdjqANGE2qxZrC5VpDA7ek3Db8v3iqunpkrXgAy7KBJgdHWUw1TEDBNewtjMJTvB9Po55PZ5d6ztCk');
    });

    it('should correctly calculate transaction id', function () {
        var transaction = {
            name: 'TESTCOIN-1',
            description: '01',
            time: 1480427109954,
            totalTokens: 1000000,
            decimalPlaces: 2,
            fee: new Money(1, Currency.WAVES)
        };

        var actual = assetService.createAssetIssueTransaction(transaction, sender);

        expect(actual.id).toEqual('BFE6QH9GQRqxWBFLvLFpT29cRdzSaqhGNoC3LTT1ER8w');
        expect(actual.timestamp).toEqual(transaction.time);
        expect(actual.name).toEqual(transaction.name);
        expect(actual.description).toEqual(transaction.description);
        expect(actual.quantity).toEqual(transaction.totalTokens * 100);
        expect(actual.decimals).toEqual(transaction.decimalPlaces);
        expect(actual.fee).toEqual(transaction.fee.toCoins());
        expect(actual.reissuable).toBe(false);
        expect(actual.senderPublicKey).toEqual(sender.publicKey);
        expect(actual.signature)
            .toEqual('5vLx5r2teXL9hnZZiCnjwBcqtbjKtwaGKrGfnqQSr8ZEyMr7KRyEoLoNer4C2iqyBZkhzvStZS4EU1RQWWpKxbNm');
    });
});
