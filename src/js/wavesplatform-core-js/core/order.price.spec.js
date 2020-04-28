describe('order.price', function() {

    var TEN_TO_POW8 = 100000000;

    var zeroCurrency = Currency.create({
        id: '0000',
        displayName: '00',
        precision: 0
    });

    beforeEach(function () {
        expect(Currency.WAVES).toBeDefined();
        expect(Currency.BTC).toBeDefined();
        expect(Currency.USD).toBeDefined();
        expect(Currency.EUR).toBeDefined();
        expect(Currency.WCT).toBeDefined();
    });

    it('calculates correct price when assets precisions are equal to 8', function () {
        var pair = {
            amountAsset: Currency.WAVES,
            priceAsset: Currency.BTC
        };

        var p = OrderPrice.fromTokens(1.47, pair);

        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47);
        expect(p.toBackendPrice()).toEqual(1.47 * TEN_TO_POW8);
    });

    it('calculates correct price when assets precisions are equal to 2', function () {
        var pair = {
            amountAsset: Currency.USD,
            priceAsset: Currency.EUR
        };

        var p = OrderPrice.fromTokens(1.47, pair);

        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47);
        expect(p.toBackendPrice()).toEqual(1.47 * TEN_TO_POW8);
    });

    it('calculates correct price when assets precisions are equal to 0', function () {
        var pair = {
            amountAsset: zeroCurrency,
            priceAsset: zeroCurrency
        };

        var p = OrderPrice.fromTokens(1.47, pair);
        expect(p.toTokens()).toEqual(1);
        expect(p.toCoins()).toEqual(1);
        expect(p.toBackendPrice()).toEqual(1 * TEN_TO_POW8);

        p = OrderPrice.fromTokens(0.04, pair);
        expect(p.toTokens()).toEqual(0);
        expect(p.toCoins()).toEqual(0);
        expect(p.toBackendPrice()).toEqual(0);

        p = OrderPrice.fromTokens(0.5, pair);
        expect(p.toTokens()).toEqual(0);
        expect(p.toCoins()).toEqual(0);
        expect(p.toBackendPrice()).toEqual(0);
    });

    it('calculates correct price when amount asset precision is 8 and price asset precision is 2', function () {
        var pair = {
            amountAsset: Currency.WAVES,
            priceAsset: Currency.EUR
        };

        var p = OrderPrice.fromTokens(1.47, pair);
        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47 * 1e-6);
        expect(p.toBackendPrice()).toEqual(147);

        p = OrderPrice.fromTokens(0.006, pair);
        expect(p.toTokens()).toEqual(0);
        expect(p.toCoins()).toEqual(0);
        expect(p.toBackendPrice()).toEqual(0);

        p = OrderPrice.fromTokens(1.006, pair);
        expect(p.toTokens()).toEqual(1);
        expect(p.toCoins()).toEqual(1 * 1e-6);
        expect(p.toBackendPrice()).toEqual(100);
    });

    it('calculates correct price when amount asset precision is 2 and price asset precision is 0', function () {
        var pair = {
            amountAsset: Currency.USD,
            priceAsset: zeroCurrency
        };

        var p = OrderPrice.fromTokens(1.47, pair);
        expect(p.toTokens()).toEqual(1);
        expect(p.toCoins()).toEqual(1 * 1e-2);
        expect(p.toBackendPrice()).toEqual(1 * 1e-2 * TEN_TO_POW8);

        p = OrderPrice.fromTokens(1.006, pair);
        expect(p.toTokens()).toEqual(1);
        expect(p.toCoins()).toEqual(1 * 1e-2);
        expect(p.toBackendPrice()).toEqual(1000000);
    });

    it('calculates correct price when amount asset precision is 2 and price asset precision is 8', function () {
        var pair = {
            amountAsset: Currency.WCT,
            priceAsset: Currency.WAVES
        };

        var p = OrderPrice.fromTokens(1.47, pair);
        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47 * 1e6);
        expect(p.toBackendPrice()).toEqual(1.47 * 1e6 * TEN_TO_POW8);

        p = OrderPrice.fromTokens(0.006, pair);
        expect(p.toTokens()).toEqual(0.006);
        expect(p.toCoins()).toEqual(0.006 * 1e6);
        expect(p.toBackendPrice()).toEqual(0.006 * 1e6 * TEN_TO_POW8);

        p = OrderPrice.fromTokens(1.006, pair);
        expect(p.toTokens()).toEqual(1.006);
        expect(p.toCoins()).toEqual(1.006 * 1e6);
        expect(p.toBackendPrice()).toEqual(1.006 * 1e6 * TEN_TO_POW8);
    });

    it('calculates correct price when amount asset precision is 0 and price asset precision is 2', function () {
        var pair = {
            amountAsset: zeroCurrency,
            priceAsset: Currency.USD
        };

        var p = OrderPrice.fromTokens(1.47, pair);
        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47 * 1e2);
        expect(p.toBackendPrice()).toEqual(1.47 * 1e2 * TEN_TO_POW8);

        p = OrderPrice.fromTokens(0.006, pair);
        expect(p.toTokens()).toEqual(0);
        expect(p.toCoins()).toEqual(0);
        expect(p.toBackendPrice()).toEqual(0);

        p = OrderPrice.fromTokens(1.036, pair);
        expect(p.toTokens()).toEqual(1.03);
        expect(p.toCoins()).toEqual(1.03 * 1e2);
        expect(p.toBackendPrice()).toEqual(1.03 * 1e2 * TEN_TO_POW8);
    });

    it('converts backend price to valid OrderPrice when assets precisions are equal to 8', function () {
        var backendPrice = 1.47 * 1e8;
        var pair = {
            amountAsset: Currency.WAVES,
            priceAsset: Currency.BTC
        };

        var p = OrderPrice.fromBackendPrice(backendPrice, pair);
        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47);
        expect(p.toBackendPrice()).toEqual(backendPrice);
    });

    it('converts backend price to valid OrderPrice when assets precisions are equal to 2', function () {
        var backendPrice = 1.47 * 1e8;
        var pair = {
            amountAsset: Currency.USD,
            priceAsset: Currency.EUR
        };

        var p = OrderPrice.fromBackendPrice(backendPrice, pair);
        expect(p.toTokens()).toEqual(1.47);
        expect(p.toCoins()).toEqual(1.47);
        expect(p.toBackendPrice()).toEqual(backendPrice);
    });

    it('converts backend price to valid OrderPrice when it contains too many significant digits', function () {
        var backendPrice = 1.473 * 1e8;
        var pair = {
            amountAsset: Currency.USD,
            priceAsset: Currency.EUR
        };

        expect(OrderPrice.fromBackendPrice(backendPrice, pair).toTokens()).toEqual(1.47);
    });
});
