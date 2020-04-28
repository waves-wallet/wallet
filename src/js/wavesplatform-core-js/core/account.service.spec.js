describe('AccountService', function () {
    var mockStorage, accountService, $rootScope;

    var clone = function (object) {
        return JSON.parse(JSON.stringify(object));
    };

    // Initialization of a mock storage before each test case
    beforeEach(function () {
        mockStorage = {
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

    // Initialization of the module before each test case
    beforeEach(module('waves.core.services'));

    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('storageService', function ($q) {
            this.saveState = function (state) {
                mockStorage = clone(state);
                return $q.when(mockStorage);
            };

            this.loadState = function () {
                return $q.when(clone(mockStorage));
            };
        });
    }));

    // Injection of dependencies
    beforeEach(inject(function ($injector) {
        accountService = $injector.get('accountService');
        $rootScope = $injector.get('$rootScope');
    }));

    it('should add new accounts properly', function () {
        var newAccount = {
            name: 'NewAccount',
            address: 'WWW'
        };

        accountService.addAccount(newAccount);
        $rootScope.$digest();

        expect(mockStorage.accounts.length).toEqual(3);
        expect(mockStorage.accounts[2]).toEqual(newAccount);
    });

    it('should remove accounts properly', function () {
        accountService.removeAccount(mockStorage.accounts[1]);
        $rootScope.$digest();
        expect(mockStorage.accounts.length).toEqual(1);

        accountService.removeAccount(mockStorage.accounts[0]);
        $rootScope.$digest();
        expect(mockStorage.accounts.length).toEqual(0);
    });

    it('should load all available accounts', function () {
        var accounts;
        accountService.getAccounts()
            .then(function (data) {
                accounts = data;
            });
        $rootScope.$digest();

        expect(accounts.length).toEqual(2);
        expect(accounts).toEqual(mockStorage.accounts);
    });

    it('should correctly remove account by index', function () {
        mockStorage.accounts.push({
            name: 'TestAccount3',
            address: mockStorage.accounts[0].address
        });
        expect(mockStorage.accounts.length).toEqual(3);
        accountService.removeAccountByIndex(2);
        $rootScope.$digest();
        expect(_.findIndex(mockStorage.accounts, {
            name: 'TestAccount3'
        })).toEqual(-1);
        expect(mockStorage.accounts.length).toEqual(2);
        accountService.removeAccountByIndex(0);
        $rootScope.$digest();
        expect(mockStorage.accounts.length).toEqual(1);
        expect(_.findIndex(mockStorage.accounts, {
            name: 'TestAccount1'
        })).toEqual(-1);
    });
});
