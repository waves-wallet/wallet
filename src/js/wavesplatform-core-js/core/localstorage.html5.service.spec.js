describe('LocalStorage.Html5.Service', function() {
    var mockState, storageService, getItemSpy, setItemSpy, removeItemSpy;
    var mockWindow = {
        localStorage: {
            getItem: function() {},
            setItem: function() {},
            removeItem: function() {}
        }
    };

    // Initialization of a mock storage before each test case
    beforeEach(function() {
        mockState = {
            accounts: [
                {
                    name: 'TestAccount1',
                    address: 'XYZ'
                },
                {
                    name: 'TestAccount2',
                    address: 'ZYX'
                }]
        };
    });

    beforeAll(function () {
        getItemSpy = spyOn(mockWindow.localStorage, 'getItem');
        setItemSpy = spyOn(mockWindow.localStorage, 'setItem');
        removeItemSpy = spyOn(mockWindow.localStorage, 'removeItem');
    });

    beforeEach(module(function ($provide) {
        $provide.value('$window', mockWindow);
    }));

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    // Injection of dependencies
    beforeEach(inject(function($injector) {
        storageService = $injector.get('html5StorageService');
    }));

    it('should implement methods', function () {
        expect(storageService.saveState).toBeDefined();
        expect(storageService.loadState).toBeDefined();
    });

    it('should save to localStore', function () {
        //when
        storageService.saveState({key: 'value', $$test: 'value'});
        //then
        expect(mockWindow.localStorage.setItem).toHaveBeenCalledWith('Wavesdevel', JSON.stringify({key: 'value'}));
    });

    it('should load from localStore', inject(function ($rootScope) {
        //init
        getItemSpy.and.returnValue(JSON.stringify(mockState));
        //when
        var response;
        storageService.loadState()
            .then(function (data) {
                response = data;
            });
        $rootScope.$digest();
        //then
        expect(response).toEqual(mockState);
        expect(mockWindow.localStorage.getItem).toHaveBeenCalledWith('Wavesdevel');
    }));

    it('should load empty from localStore', inject(function ($rootScope) {
        //init
        getItemSpy.and.returnValue(undefined);
        //when
        var response;
        storageService.loadState()
            .then(function (data) {
                response = data;
            });
        $rootScope.$digest();
        //then
        expect(response).toBeUndefined();
    }));

    it('should clear localstore', function () {
        //when
        storageService.clear();
        //then
        expect(mockWindow.localStorage.removeItem).toHaveBeenCalledWith('Wavesdevel');
    });
});
