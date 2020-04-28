describe('Alias.Request.Service', function() {
    var requestService, cryptoService;
    var sender = {
        publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
        privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
    };

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    // Injection of dependencies
    beforeEach(inject(function($injector) {
        requestService = $injector.get('aliasRequestService');
        cryptoService = $injector.get('cryptoService');

        // changing non-deterministic signatures with deterministic ones
        // to always have the same transaction signature
        spyOn(cryptoService, 'nonDeterministicSign').and.callFake(function (privateKeyBytes, signatureData) {
            return cryptoService.deterministicSign(privateKeyBytes, signatureData);
        });
    }));

    it('should successfully sign create alias request', function () {
        var fee = Money.fromTokens(0.01, Currency.WAVES);
        var nick = 'Sasha Ivanov';
        var alias = {
            alias: nick,
            time: 1491556329420,
            fee: fee
        };

        var request = requestService.buildCreateAliasRequest(alias, sender);

        expect(request.alias).toEqual(nick);
        expect(request.fee).toEqual(1000000);
        expect(request.senderPublicKey).toEqual(sender.publicKey);
        expect(request.signature)
            .toEqual('3ZdLECvR742intDnAQP9W4kWNwGbwkWa7WpMp7FzaVN71XkWRzvQwa7MQTxfWQfBEN8kzw1cW8PsgFRzBVve4zxk');
    });

    it('should throw an error if sender is not given', function () {
        expect(function () { requestService.buildCreateAliasRequest({}); }).toThrowError(/Sender/);
    });
});
