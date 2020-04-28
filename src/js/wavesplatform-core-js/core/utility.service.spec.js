describe('Utility.Service', function() {
    var utilityService;

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    // Injection of dependencies
    beforeEach(inject(function($injector) {
        utilityService = $injector.get('utilityService');
    }));

    it('should correctly check whether a string ends with whitespace', function () {
        expect(utilityService.endsWithWhitespace('    ababab')).toBe(false);
        expect(utilityService.endsWithWhitespace('fasdfkjh sdfasdf   a')).toBe(false);
        expect(utilityService.endsWithWhitespace('fasdfds sdfasdf a ')).toBe(true);
        expect(utilityService.endsWithWhitespace(' fbsdfb sdfg fsd a\t')).toBe(true);
    });

    it('should correctly convert short values to byte array', function () {
        expect(utilityService.shortToByteArray(14851)).toEqual([58, 3]);
    });

    var allBase58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    it('should validate base58 string positive', function () {
        expect(utilityService.isValidBase58String('abc')).toBeTruthy();
        expect(utilityService.isValidBase58String(allBase58Chars)).toBeTruthy();
    });

    it('should validate base58 string negative', function () {
        expect(utilityService.isValidBase58String('0')).toBeFalsy();
        expect(utilityService.isValidBase58String('l')).toBeFalsy();
        expect(utilityService.isValidBase58String('I')).toBeFalsy();
        expect(utilityService.isValidBase58String('O')).toBeFalsy();
        expect(utilityService.isValidBase58String(' ')).toBeFalsy();
    });
});
