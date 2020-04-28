describe('Leasing.Request.Service', function() {
    var requestService, cryptoService;
    var sender = {
        publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
        privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
    };
    var recipient = '3MsiHfvFVUULdn8bpVoDQ7JLKKjtPXUrCLT';
    var alias = 'test alias';

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    // Injection of dependencies
    beforeEach(inject(function($injector) {
        requestService = $injector.get('leasingRequestService');
        cryptoService = $injector.get('cryptoService');

        // changing non-deterministic signatures with deterministic ones
        // to always have the same transaction signature
        spyOn(cryptoService, 'nonDeterministicSign').and.callFake(function (privateKeyBytes, signatureData) {
            return cryptoService.deterministicSign(privateKeyBytes, signatureData);
        });
    }));

    it('should successfully sign start leasing request', function () {
        var amount = Money.fromTokens(2, Currency.WAVES);
        var fee = Money.fromTokens(0.01, Currency.WAVES);
        var startLeasing = {
            recipient: recipient,
            amount: amount,
            time: 1491491715188,
            fee: fee
        };

        var request = requestService.buildStartLeasingRequest(startLeasing, sender);

        expect(request.amount).toEqual(200000000);
        expect(request.fee).toEqual(1000000);
        expect(request.senderPublicKey).toEqual(sender.publicKey);
        expect(request.recipient).toEqual(recipient);
        expect(request.signature)
            .toEqual('4KV99VcLG51uej8tcdJBwcc3Kj2tCAxwT7JNwycxNQzAGURxcyo2XhmMTWiD1gVqs4GhkAYHGrjsBR2CJcdU5X6Z');
    });

    it('should successfully sign start leasing request with an alias', function () {
        var amount = Money.fromTokens(2, Currency.WAVES);
        var fee = Money.fromTokens(0.01, Currency.WAVES);
        var startLeasing = {
            recipient: alias,
            amount: amount,
            time: 1491491715188,
            fee: fee
        };

        var request = requestService.buildStartLeasingRequest(startLeasing, sender);

        expect(request.amount).toEqual(200000000);
        expect(request.fee).toEqual(1000000);
        expect(request.senderPublicKey).toEqual(sender.publicKey);
        expect(request.recipient).toEqual('alias:T:' + alias);
        expect(request.signature)
            .toEqual('HuKk26pPjxusLhch6ehwbFeBc8iiMuKd2pzwhwTf5rEFqSyyUiU3ChpVw3w86daRPMPkVUNkf6b9SmTetFgGxXy');
    });

    it('should successfully sign cancel leasing request', function () {
        var startLeasingTransactionId = '4X85MhqxukwaPqJC4sSSeN3ptSYHbEca7KgiYtUa2ECX';
        var fee = Money.fromTokens(0.1, Currency.WAVES);

        var cancelLeasing = {
            startLeasingTransactionId: startLeasingTransactionId,
            time: 1491491734819,
            fee: fee
        };

        var request = requestService.buildCancelLeasingRequest(cancelLeasing, sender);

        expect(request.txId).toEqual(startLeasingTransactionId);
        expect(request.fee).toEqual(1e7);
        expect(request.senderPublicKey).toEqual(sender.publicKey);
        expect(request.signature)
            .toEqual('2AcYC2TtpHRVhqN4V9cZADDz7bA2f4PVqoisBULYUn39t73jkE5fEpRZFEKgJiBU8NSPqcww9Qt7aY7VeSqpDVcW');
    });

    it('should throw an error if sender is not given', function () {
        expect(function () { requestService.buildCancelLeasingRequest({}); }).toThrowError(/Sender/);
        expect(function () { requestService.buildStartLeasingRequest({}); }).toThrowError(/Sender/);
    });
});
