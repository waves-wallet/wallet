describe('PassPhrase.Service', function() {
    var passPhraseService, words;

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    // Injection of dependencies
    beforeEach(inject(function($injector) {
        passPhraseService = $injector.get('passPhraseService');
        words = $injector.get('wordList');
    }));

    it('should generate a phrase from a given list of words', function () {
        var phrase = passPhraseService.generate();

        var list = phrase.split(' ');
        expect(list.length).toEqual(15);
        for (var i = 0; i < list.length; i++) {
            expect(words).toContain(list[i]);
        }
    });
});
