(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('passPhraseService', ['wordList', '$window', function (wordList, $window) {
            this.generate = function () {
                var crypto = $window.crypto || $window.msCrypto;
                var bits = 160;
                var wordCount = wordList.length;
                var log2FromWordCount = Math.log(wordCount) / Math.log(2);
                var wordsInPassPhrase = Math.ceil(bits / log2FromWordCount);
                var random = new Uint16Array(wordsInPassPhrase);
                var passPhrase;

                crypto.getRandomValues(random);

                var i = 0,
                    index,
                    words = [];

                for (; i < wordsInPassPhrase; i++) {
                    index = random[i] % wordCount;
                    words.push(wordList[index]);
                }

                passPhrase = words.join(' ');

                crypto.getRandomValues(random);

                return passPhrase;
            };
        }]);
})();
