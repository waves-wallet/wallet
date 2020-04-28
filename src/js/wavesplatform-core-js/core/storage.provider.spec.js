describe('Storage.Provider', function() {
    var chrome = {engine: 'chrome'};
    var html5 = {engine: 'html5'};
    var storageService;
    var provider;
    var storage = {};
    var wnd;

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    beforeEach(function () {
        module(function (storageServiceProvider) {
            provider = storageServiceProvider;
        });
    });

    describe('Html5.Feature', function() {
        beforeEach(angular.mock.module(function($provide) {
            $provide.value('html5StorageService', html5);
            $provide.value('chromeStorageService', chrome);
        }));

        // Injection of dependencies
        beforeEach(inject(function($injector) {
            storageService = $injector.invoke(provider.$get);
        }));

        it('should return Html5 storage service being run in a usual browser', function () {
            expect(storageService).toBe(html5);
        });
    });

    describe('Chrome.Feature', function() {
        beforeEach(angular.mock.module(function($provide) {
            wnd = {
                localStorage: {
                    getItem: function (id) {
                    },
                    setItem: function (key, value) {
                    }
                }
            };

            $provide.value('$window', wnd);
            $provide.value('html5StorageService', html5);
            $provide.value('chromeStorageService', chrome);
        }));

        // Injection of dependencies
        beforeEach(inject(function($injector) {
            storageService = $injector.invoke(provider.$get);
        }));

        it('should return Html5 storage service being run in a usual browser', function () {
            expect(storageService).toBe(chrome);
        });
    });
});
