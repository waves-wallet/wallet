/******************************************************************************
 * Copyright © 2016 The Waves Developers.                                *
 *                                                                            *
 * See the LICENSE files at                                                   *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE      *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

/**
 * @requires {decimal.js}
 */

var Currency = (function () {
    var currencyCache = {};

    function Currency(data) {
        data = data || {};

        this.id = data.id; // base58 encoded asset id of the currency
        this.displayName = data.displayName;
        this.shortName = data.shortName || data.displayName;
        this.precision = data.precision; // number of decimal places after a decimal point
        this.verified = data.verified || false;

        if (data.roundingMode !== undefined) {
            this.roundingMode = data.roundingMode;
        } else {
            this.roundingMode = Decimal.ROUND_HALF_UP;
        }

        return this;
    }

    Currency.prototype.toString = function () {
        if (this.shortName)
            return this.shortName;

        return this.displayName;
    };

    var WAVES = new Currency({
        id: '',
        displayName: 'Waves',
        shortName: 'WAVES',
        precision: 8,
        verified: true
    });

    var BTC = new Currency({
        id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
        displayName: 'Bitcoin',
        shortName: 'BTC',
        precision: 8,
        verified: true
    });

    var BCH = new Currency({
        id: 'zMFqXuoyrn5w17PFurTqxB7GsS71fp9dfk6XFwxbPCy',
        displayName: 'Bitcoin Cash',
        shortName: 'BCH',
        precision: 8,
        verified: true
    });

    var ETH = new Currency({
        id: '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu',
        displayName: 'Ethereum',
        shortName: 'ETH',
        precision: 8,
        verified: true
    });

    var LTC = new Currency({
        id: 'HZk1mbfuJpmxU1Fs4AX5MWLVYtctsNcg6e2C6VKqK8zk',
        displayName: 'Litecoin',
        shortName: 'LTC',
        precision: 8,
        verified: true
    });

    var ZEC = new Currency({
        id: 'BrjUWjndUanm5VsJkbUip8VRYy6LWJePtxya3FNv4TQa',
        displayName: 'ZCash',
        shortName: 'ZEC',
        precision: 8,
        verified: true
    });

    var USD = new Currency({
        id: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
        displayName: 'US Dollar',
        shortName: 'USD',
        precision: 2,
        verified: true
    });

    var EUR = new Currency({
        id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
        displayName: 'Euro',
        shortName: 'EUR',
        precision: 2,
        verified: true
    });

    var CNY = new Currency({
        id: 'DEJbZipbKQjwEiRjx2AqQFucrj5CZ3rAc4ZvFM8nAsoA',
        displayName: 'Chinese Yuan',
        shortName: 'CNY',
        precision: 2,
        verified: true
    });

    var WCT = new Currency({
        id: 'DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J',
        displayName: 'Waves Community',
        shortName: 'WCT',
        precision: 2,
        verified: true
    });

    var MRT = new Currency({
        id: '4uK8i4ThRGbehENwa6MxyLtxAjAo1Rj9fduborGExarC',
        displayName: 'Miner Reward',
        shortName: 'MRT',
        precision: 2,
        verified: true
    });

    var WGO = new Currency({
        id: '4eT6R8R2XuTcBuTHiXVQsh2dN2mg3c2Qnp95EWBNHygg',
        displayName: 'WavesGo',
        shortName: 'WGO',
        precision: 8,
        verified: true
    });

    var INCNT = new Currency({
        id: 'FLbGXzrpqkvucZqsHDcNxePTkh2ChmEi4GdBfDRRJVof',
        displayName: 'Incent',
        shortName: 'INCNT',
        precision: 8,
        verified: true
    });

    var RBX = new Currency({
        id: 'AnERqFRffNVrCbviXbDEdzrU6ipXCP5Y1PKpFdRnyQAy',
        displayName: 'Ripto Bux',
        shortName: 'RBX',
        precision: 8,
        verified: true
    });

    var MER = new Currency({
        id: 'HzfaJp8YQWLvQG4FkUxq2Q7iYWMYQ2k8UF89vVJAjWPj',
        displayName: 'Mercury',
        shortName: 'MER',
        precision: 8,
        verified: true
    });

    var BAt = new Currency({
        id: 'APz41KyoKuBBh8t3oZjqvhbbsg6f63tpZM5Ck5LYx6h',
        displayName: 'B@nkcoin',
        shortName: 'B@',
        precision: 8,
        verified: true
    });

    var UPC = new Currency({
        id: '4764Pr9DpKQAHAjAVA2uqnrYidLMnM7vpDDLCDWujFTt',
        displayName: 'Upcoin',
        shortName: 'UPC',
        precision: 2,
        verified: true
    });

    var KLN = new Currency({
        id: 'EYz8Zvs62D4d7F5ZgXHCWuzuFaZg63FYnfVQrTWQoLSK',
        displayName: 'Kolion',
        shortName: 'KLN',
        precision: 4,
        verified: true
    });

    var TKS = new Currency({
        id: 'BDMRyZsmDZpgKhdM7fUTknKcUbVVkDpMcqEj31PUzjMy',
        displayName: 'Tokes',
        shortName: 'TKS',
        precision: 8,
        verified: true
    });

    var WPN = new Currency({
        id: 'BkFyeRdrLquxds5FenxyonyfTwMVJJ6o6L7VTaPr5fs3',
        displayName: 'WavesPool.NET',
        shortName: 'WPN',
        precision: 8,
        verified: true
    });

    var EFYT = new Currency({
        id: '725Yv9oceWsB4GsYwyy4A52kEwyVrL5avubkeChSnL46',
        displayName: 'Ergo First Year Token',
        shortName: 'EFYT',
        precision: 8,
        verified: true
    });

    var MGO = new Currency({
        id: '2Y8eFFXDTkxgCvXbMT5K4J38cpDYYbQdciJEZb48vTDj',
        displayName: 'Mobile Go Token',
        shortName: 'MGO',
        precision: 8,
        verified: true
    });

    var ETT = new Currency({
        id: '8ofu3VpEaVCFjRqLLqzTMNs5URKUUQMrPp3k6oFmiCc6',
        displayName: 'EncryptoTel',
        shortName: 'ETT',
        precision: 8,
        verified: true
    });

    var ZRC = new Currency({
        id: '5ZPuAVxAwYvptbCgSVKdTzeud9dhbZ7vvxHVnZUoxf4h',
        displayName: 'ZrCoin',
        shortName: 'ZRC',
        precision: 8,
        verified: true
    });

    var PBKX = new Currency({
        id: '39wcSXj4MdRNRJXA88rVxF7EXWjYixaA3J3EteoN6DMM',
        displayName: 'privateBANKX',
        shortName: 'PBKX',
        precision: 0,
        verified: true
    });

    var PING = new Currency({
        id: 'Bi4w2UuGRt2jAJFfRb8b3SwDUV5x8krCzX2zZHcRfPNc',
        displayName: 'CryptoPing',
        shortName: 'PING',
        precision: 8,
        verified: true
    });

    var STAR = new Currency({
        id: 'BTfuGGoeA934Ta1fgcehQ5UhbHuWKj4don64ZNBuMT38',
        displayName: 'Starrie',
        shortName: 'STAR',
        precision: 8,
        verified: true
    });

    var BEAR = new Currency({
        id: '9gnc5UCY6RxtSi9FEJkcD57r5NBgdr45DVYtunyDLrgC',
        displayName: 'BearWaves',
        shortName: 'BEAR',
        precision: 2,
        verified: true
    });

    var DAR = new Currency({
        id: 'K5JcgN8UdwNdh5sbdAuPMm5XEd5aFvoXaC3iHsHVz1d',
        displayName: 'Darcrus',
        shortName: 'DAR',
        precision: 6,
        verified: true
    });

    var GLIPP = new Currency({
        id: '9g5JiYThxFTxknSMA3TT5xoXG7GYjRrTJxxLeeoQ36kJ',
        displayName: 'GLIPP',
        shortName: 'GLIPP',
        precision: 8,
        verified: true
    });

    var mTNT = new Currency({
        id: '8HYDtqEuHj3RDcwR8yxEvPq1qQSB9FazC8wMHtRb2TFe',
        displayName: 'MyTrackNet',
        shortName: 'mTNT',
        precision: 6,
        verified: true
    });

    var BKT = new Currency({
        id: '9c7U7bXdP23oHpmGKwGfSsjFrpxdRcp3tp28qbfhEc3d',
        displayName: '$bkt',
        shortName: 'BKT',
        precision: 0,
        verified: true
    });

    var WGR = new Currency({
        id: '8t8DMJFQu5GEhvAetiA8aHa3yPjxLj54sBnZsjnJ5dsw',
        displayName: 'Wagerr',
        shortName: 'WGR',
        precision: 8,
        verified: true
    });

    var PBT = new Currency({
        id: 'EdDvbhk4wJ1kL6pMCq1V36GbQE2nGE7Metb87zbaY2JL',
        displayName: 'Primalbase Token',
        shortName: 'PBT',
        precision: 4,
        verified: true
    });

    var PPIO = new Currency({
        id: '8UHSg6jCDTUvKT3LmeDjoaPxKmnJhdLEgBHU3vUrojSm',
        displayName: 'pospool_io',
        shortName: 'PPIO',
        precision: 2,
        verified: true
    });

    var STA = new Currency({
        id: '3SdrmU1GGZRiZz12MrMcfUz4JksTzvcU25cLFXpZy1qz',
        displayName: 'Starta',
        shortName: 'STA',
        precision: 2,
        verified: true
    });

    var CORE = new Currency({
        id: '3MyMJ9pXLTDnMQhNgoDUBtcfmaGVgnaZNARZwcZzMFk7',
        displayName: 'CORE',
        shortName: 'CORE',
        precision: 8,
        verified: true
    });

    var KSS = new Currency({
        id: 'Dq6ku3HyiMfKvorz2PLRAPwa9ykF78V1uiBhXtMbL2f2',
        displayName: 'Krosscoin',
        shortName: 'KSS',
        precision: 3,
        verified: true
    });

    var WFN = new Currency({
        id: '7yXJqP2zpXTiXuS2o25seUHYxdDnfSPZJ3SEm5DrQ7cx',
        displayName: 'WavesFullNode',
        shortName: 'WFN',
        precision: 8,
        verified: true
    });

    var GRPH = new Currency({
        id: '13QuhSAkAueic5ncc8YRwyNxGQ6tRwVSS44a7uFgWsnk',
        displayName: 'Graph',
        shortName: 'GRPH',
        precision: 8,
        verified: true
    });

    var ESC = new Currency({
        id: 'FoKiAEqHSit88f4iu1neKkzsanYHQqLRyR4DXucRGKbW',
        displayName: 'EstateCoin',
        shortName: 'ESC',
        precision: 2,
        verified: true
    });

    var AGRO = new Currency({
        id: 'J8mgyjKQb4M7DjEKvewBSvKZULMZMDpUtua9VtByLbVD',
        displayName: 'Agro token',
        shortName: 'AGRO',
        precision: 8,
        verified: true
    });

    var KING = new Currency({
        id: 'CHUTTYkDd9qFmQthCL7eHTDHwYudfthqwYCYsdvpCZbf',
        displayName: 'King93',
        shortName: 'KING',
        precision: 8,
        verified: true
    });

    var ARNA = new Currency({
        id: 'BsDmB74Y1PvtVrE741i5CJThChQHHF96hDL5nXwv7JdS',
        displayName: 'Arena',
        shortName: 'ARNA',
        precision: 8,
        verified: true
    });

    var WNET = new Currency({
        id: 'AxAmJaro7BJ4KasYiZhw7HkjwgYtt2nekPuF2CN9LMym',
        displayName: 'Wavesnode.NET',
        shortName: 'WNET',
        precision: 8,
        verified: true
    });

    var PBK = new Currency({
        id: '3eBcKvyMavxACq54yvXk1rCAP4E475NCwGKV6AmQQNaw',
        displayName: 'PeerBanks',
        shortName: 'PBK',
        precision: 8,
        verified: true
    });

    var TOM = new Currency({
        id: '3e7aYkysNohFDonLVaUFGgZ46mV3Y3r7Rqzi95GYGxeK',
        displayName: 'Tomahawkcoin',
        shortName: 'TOM',
        precision: 0,
        verified: true
    });

    var ViC = new Currency({
        id: 'Gh8Ed6n1y9wscFHT6s4EH6uhKajvNQ88oPkkFkYkgXyX',
        displayName: 'WaVialcoin',
        shortName: 'ViC',
        precision: 8,
        verified: true
    });

    var EQ = new Currency({
        id: 'DoL6wC5a72Fuxg7FtfUMWbJB9kjRuvQ3BQKrgjym3gh6',
        displayName: 'EQUI Token',
        shortName: 'EQ',
        precision: 8,
        verified: true
    });

    var SHDW = new Currency({
        id: 'ETLzrCpBqTrpyuMGdiVLBPZnUoKwte88oVdJjoFi5R2h',
        displayName: 'ShadowToken',
        shortName: 'SHDW',
        precision: 8,
        verified: true
    });

    var GIN = new Currency({
        id: '9x9ATvB61fE5TU1zRdZvyvA5Q8ZYEs2yRmzTBAs69R9N',
        displayName: 'GingerDrink.EU',
        shortName: 'GIN',
        precision: 2,
        verified: true
    });

    var NEWS = new Currency({
        id: '2EAUTcAsFMsndSgiGacKRvygFR1e6gdSd8bEpiemsTPE',
        displayName: 'NEWSTOKEN',
        shortName: 'NEWS',
        precision: 8,
        verified: true
    });

    var COXST = new Currency({
        id: '7tZxVdAWc8QvsMrXBoicMgU2bSJsaEpFJnPYn1H31B8B',
        displayName: 'CoExistCoin',
        shortName: 'COXST',
        precision: 8,
        verified: true
    });

    var SMR = new Currency({
        id: 'EbY2Uf9ukD4ndg5J7MA7CjhB7xbAsiViTmVSemb186V8',
        displayName: 'Summer',
        shortName: 'SMR',
        precision: 8,
        verified: true
    });

    var RDT = new Currency({
        id: 'Fw2Sg8x4VZyxU5ManJTo69JCKg9Rox7xDNKxdQdxXDWk',
        displayName: 'Ryder Token',
        shortName: 'RDT',
        precision: 2,
        verified: true
    });

    var IRA = new Currency({
        id: '3eBcKvyMavxACq54yvXk1rCAP4E475NCwGKV6AmQQNaw',
        displayName: 'PeerBanks',
        shortName: 'IRA',
        precision: 8,
        verified: true
    });

    var _2B4T = new Currency({
        id: '2LU8GwJFvVebrCvgDhMTLDzm3dHxuN1x7ks8dQRiSj9N',
        displayName: '2B4T',
        shortName: '2B4T',
        precision: 2,
        verified: true
    });

    var MBX = new Currency({
        id: '2CX6EFHYmXYyop4hD7dUywST5K51Hvi2m5brFo35C6EZ',
        displayName: 'MyBitX',
        shortName: 'MBX',
        precision: 2,
        verified: true
    });

    var KNOWS = new Currency({
        id: 'CqSHx4WhszTZhabfWD8UuX8efg5hbZTPRNtnwW1ojJxe',
        displayName: 'KNOWS',
        shortName: 'KNOWS',
        precision: 8,
        verified: true
    });

    var MBI = new Currency({
        id: 'CJpRwfpBcFyA6p3g1fb7xuiArSQ7xLkNH8SD9AB4HeD9',
        displayName: 'MonsterByte',
        shortName: 'MBI',
        precision: 2,
        verified: true
    });

    var COF = new Currency({
        id: 'AcrRM9STdBu5PNiFveTCbRFTS8tADhKcsbC2KBp8A4tx',
        displayName: 'CoffeeCoin',
        shortName: 'COF',
        precision: 3,
        verified: true
    });

    var CHILL = new Currency({
        id: 'DsxRbfYXzwf4PFwUD6kyEJhj2Wd5E9NsHr5WynVKTzie',
        displayName: 'Chill',
        shortName: 'CHILL',
        precision: 8,
        verified: true
    });

    var KUN = new Currency({
        id: 'F6EK5bcdEShWPA9pGdgqGYmPPUZ9FaHnyVwPZfXCTxV7',
        displayName: 'KUNA',
        shortName: 'KUN',
        precision: 0,
        verified: true
    });

    var CEIT = new Currency({
        id: '83Y1Ub3Kp9uitTTgKGPnaZE6EC793XuC3muoJC8zsFir',
        displayName: 'CorpEdu',
        shortName: 'CEIT',
        precision: 4,
        verified: true
    });

    var SGIT = new Currency({
        id: 'BYkKnXLUS3qRyNvbSTvNWJ3pTsW7uZGHhV4HQ3pdf6DW',
        displayName: 'SmartGames',
        shortName: 'SGIT',
        precision: 4,
        verified: true
    });

    var AHT = new Currency({
        id: 'HfFHZaPzGMSdHvaaZ7S8mrZrPWEyGzfA6VDuSRzb8uY6',
        displayName: 'Bowhead',
        shortName: 'AHT',
        precision: 8,
        verified: true
    });

    var HALAL = new Currency({
        id: 'BjAZxDeFpYaQ1gwmg65vYArhve31k8j9mscQDecNZ2bX',
        displayName: 'HALAL',
        shortName: 'HALAL',
        precision: 7,
        verified: true
    });

    var DIMO = new Currency({
        id: 'BEth3AJY65jWWF7KCDSFgMS6g5AvDvoAWrn8UYEsoA17',
        displayName: 'DIMO',
        shortName: 'DIMO',
        precision: 8,
        verified: true
    });

    var WIN = new Currency({
        id: '7Ry7rUTSS1iCJBFa7trCbwzAwnvvAUrX3gcz2iTL8aAF',
        displayName: 'WinToken',
        shortName: 'WIN',
        precision: 2,
        verified: true
    });

    var YTB = new Currency({
        id: 'HhzJGgbbogGQubKkHUyEaHKs7fBRebjoJkgiDQ8jrYee',
        displayName: 'YouTubeCoin',
        shortName: 'YTB',
        precision: 0,
        verified: true
    });

    var GFL = new Currency({
        id: 'D6hYNYUSxsLtvkUJ4Mxp6s7mT4WACbwJSsVGCQKxkSfH',
        displayName: 'GoldenFleece',
        shortName: 'GFL',
        precision: 8,
        verified: true
    });

    var DAT = new Currency({
        id: 'DBLes8Bxb1P4qL1XaRRPL4d4xTVZSWHKP4oKGyFZjwBe',
        displayName: 'DATALIFE',
        shortName: 'DAT',
        precision: 6,
        verified: true
    });

    var VK = new Currency({
        id: '5WLqNPkA3oDp1hTFCeUukTL1qvFnk9Ew7DXTtCzvoCxi',
        displayName: 'VKCoin',
        shortName: 'VK',
        precision: 0,
        verified: true
    });

    var UWT = new Currency({
        id: 'AdEVVde2XTDa1qDPWfChUGH2XP67duQ4NnpQWXs7wETF',
        displayName: 'Useless Token',
        shortName: 'UWT',
        precision: 0,
        verified: true
    });

    var AP_0 = new Currency({
        id: 'BYMmfwocym3d3cuFc9XytbAWGCdAM9875n5fTFokGTMm',
        displayName: 'AP-glasscoin#0',
        shortName: 'AP#0',
        precision: 0,
        verified: true
    });

    var AP_1 = new Currency({
        id: 'FgPzwZqGngVG45d6WtP5273diR8cHRjs95aT6g1tuFUv',
        displayName: 'AP-glasscoin#1',
        shortName: 'AP#1',
        precision: 0,
        verified: true
    });

    var AP_2 = new Currency({
        id: '6qLNnEV34cE8CZi5hk3nTNiUeHZcKz35R7AafPSukSAt',
        displayName: 'AP-glasscoin#2',
        shortName: 'AP#2',
        precision: 0,
        verified: true
    });

    var OCL = new Currency({
        id: 'ABFYQjwDHSct6rNk59k3snoZfAqNHVZdHz4VGJe2oCV5',
        displayName: '$OCL Oceanlab',
        shortName: 'OCL',
        precision: 8,
        verified: true
    });

    var OCC = new Currency({
        id: 'CL9PN5rpMm3ed2x6g9SWDQJfHciZFwXee2hhehmitzRj',
        displayName: 'OurCoin Classic',
        shortName: 'OCC',
        precision: 2,
        verified: true
    });

    var SMART = new Currency({
        id: '4xDfFdPorzNmB5w8p28Fs5z6fPMf4QKJGcxY3DWT9ugG',
        displayName: 'SMART',
        shortName: 'SMART',
        precision: 8,
        verified: true
    });

    var DCN = new Currency({
        id: 'DnAGJqeraWszYBfRjjbxtZDb1vggjUDZjWo49i15hGo1',
        displayName: 'Duocoin',
        shortName: 'DCN',
        precision: 2,
        verified: true
    });

    var RSC = new Currency({
        id: 'EMdiF8uaySswfCdMxc114rSfzUsAKCtK9d8eSx6ruKP4',
        displayName: 'RusCoin',
        shortName: 'RSC',
        precision: 5,
        verified: true
    });

    var LIKE = new Currency({
        id: '71tUQ7miLb2vNViGYCarYvdNj2BnDyxuFMCQivViqZq6',
        displayName: 'like',
        shortName: 'LIKE',
        precision: 8,
        verified: true
    });

    var FUPOOF = new Currency({
        id: 'EAmQHCqBVeNunvYRC5bFQh6mtvF34bL9qAwug5PGvjjE',
        displayName: 'Fupoof Coin',
        shortName: 'FUPOOF',
        precision: 3,
        verified: true
    });

    var ANY = new Currency({
        id: '2L9piWsMG4dZ84WgybXa9SPYFhyBEiP5fcv1BmJ9Gy7X',
        displayName: 'anyco',
        shortName: 'ANY',
        precision: 8,
        verified: true
    });

    var BRW = new Currency({
        id: '3EAHaZPwV5gCoWkoLhjj7rSz9ix7Q4SE6mFczoxA3f9D',
        displayName: 'BrWaves',
        shortName: 'BRW',
        precision: 3,
        verified: true
    });

    var CNX = new Currency({
        id: 'CSX1Ynv6AXmJmfnG1hBczrL9tN5HWrjVx5Ur3WJeuErv',
        displayName: 'Cryptonetix',
        shortName: 'CNX',
        precision: 8,
        verified: true
    });

    var DARF = new Currency({
        id: '96NFBPoikAeacesZggFa6wBXAyczgZFyupbX5rJwFfdQ',
        displayName: 'DARF',
        shortName: 'DARF',
        precision: 8,
        verified: true
    });

    var WNT = new Currency({
        id: 'EqdXBgKgKqdpD3kGT4tS9VgLifZXS3ASihwM3hnprNdU',
        displayName: 'WavesNotify',
        shortName: 'WNT',
        precision: 0,
        verified: true
    });

    var CWV = new Currency({
        id: 'HxxSmVuX4HbHDiDSGg96nx7wgCBhB9UPHh6pxgnKXjv4',
        displayName: 'Cryptowave',
        shortName: 'CWV',
        precision: 3,
        verified: true
    });

    var WCASH = new Currency({
        id: '2sikuhpBdZV2x5gHoA7adCStxuTSJ8m6r4hSRDLKz2zN',
        displayName: 'WCASH',
        shortName: 'WCASH',
        precision: 8,
        verified: true
    });

    var LIFE = new Currency({
        id: '5qtfgMsSAQsYMC947aYZcej1qMVQvMfRgLc3mexMXWE1',
        displayName: 'LIFE',
        shortName: 'LIFE',
        precision: 8,
        verified: true
    });

    var RDCR = new Currency({
        id: 'EXKrrWnMYnZrPYbrygnwzKKx5jjaEqALEgQhtoCcBdKG',
        displayName: 'RDCR',
        shortName: 'RDCR',
        precision: 8,
        verified: true
    });

    var THNX = new Currency({
        id: '2XQGE8LY9hUruumZ9ewK82akHMnS8a2nSXKdKXfBnuLH',
        displayName: 'ThankYou',
        shortName: 'THNX',
        precision: 4,
        verified: true
    });

    var IKV = new Currency({
        id: '8SNKiX53Yi2yjG1ZbRM4dEQJaJDpns7aN1FWBg5AZDBn',
        displayName: 'Ikeva',
        shortName: 'IKV',
        precision: 5,
        verified: true
    });

    var WDESK = new Currency({
        id: 'CqdGdzvXVp2Gxn7wCZgCboMQu2cWYf6HKAsZFyg3Sq7Q',
        displayName: 'WavesDesk',
        shortName: 'WDESK',
        precision: 8,
        verified: true
    });

    var SUR = new Currency({
        id: '5EAm2T6rKnaDHBT8ptWnuEqvKszp8SW9XPFYD1yAAW2x',
        displayName: 'Suretly',
        shortName: 'SUR',
        precision: 8,
        verified: true
    });

    var SIBERIA = new Currency({
        id: '9QrUSk9mkkdRPKDzNnEVDBoMDb6iBny4XpxsYtpwJdH9',
        displayName: 'SIBERIA',
        shortName: 'SIBERIA',
        precision: 2,
        verified: true
    });

    var MODO = new Currency({
        id: '9kEcosT68xX1Azx2ZkUkgWmwQ5SxzN9rssFieiaxT1PN',
        displayName: 'MODO',
        shortName: 'MODO',
        precision: 8,
        verified: true
    });

    var GIVE = new Currency({
        id: 'AvcbtGUgZwXrfn7rJwBLzoHCrJhtUusnco5amqF7foWU',
        displayName: 'Give Coin',
        shortName: 'GIVE',
        precision: 2,
        verified: true
    });

    var SOL = new Currency({
        id: '6sosMnsaCM5iowMjdPHXDJNrByrw8L8SQCDeD2xoNeK4',
        displayName: 'SolarLab',
        shortName: 'SOL',
        precision: 8,
        verified: true
    });

    var EOT = new Currency({
        id: 'GdnNbe6E3txF63gv3rxhpfxytTJtG7ZYyHAvWWrrEbK5',
        displayName: 'EOT Token',
        shortName: 'EOT',
        precision: 8,
        verified: true
    });

    var FIX = new Currency({
        id: 'GS5RfWDS8ytVnxqr7M2pnqeFuu7BpSwGnADTcw23FvbZ',
        displayName: 'Finamatrix',
        shortName: 'FIX',
        precision: 8,
        verified: true
    });

    var KKO = new Currency({
        id: '6gZUKe6EhDnA8vMFdwLMjLm3QLhRe1v66LvST7ZWJcZW',
        displayName: 'Cacao Shares',
        shortName: 'KKO',
        precision: 8,
        verified: true
    });

    var JNT = new Currency({
        id: '8FHrsE6ixLyEnbcJqxXaGRcEU2aziuEBvQ6Tebgqrv5c',
        displayName: 'jNetCoin',
        shortName: 'JNT',
        precision: 5,
        verified: true
    });

    var CGT = new Currency({
        id: 'CVxqNTyfD39WrNsXSfpAUTzsA76astJpzQVEiZn8a1Ai',
        displayName: 'Cryptogene Token',
        shortName: 'CGT',
        precision: 0,
        verified: true
    });

    var AFFT = new Currency({
        id: '9UFoSQSZZU5j8au1cLYgJGNNtuXAc2s1C4Xd8sPimqL8',
        displayName: 'AFFT',
        shortName: 'AFFT',
        precision: 8,
        verified: true
    });

    var MFL = new Currency({
        id: '7EHVUjcgEV9Du8qp95tS1eBV8DFtenmX64H3QawdCkC4',
        displayName: 'McFly',
        shortName: 'MFL',
        precision: 2,
        verified: true
    });

    var TURTL = new Currency({
        id: '7VDRFwm2HbaJCk3U4HQDhLGdSCxZwPe3cHefVXy7ejYe',
        displayName: 'WorldTurtleCoin',
        shortName: 'TURTL',
        precision: 8,
        verified: true
    });

    var PropX = new Currency({
        id: '7QVcLyMCQ53KSCLhZN7m3FLbfjuoHxxk5xBiToE1gmAE',
        displayName: 'PropX',
        shortName: 'PropX',
        precision: 8,
        verified: true
    });

    var ECT = new Currency({
        id: 'ErZseGoQ81jWTnKbGim7djVgyAqrsYLQr5SwrEjnF7wM',
        displayName: 'eCoin Token',
        shortName: 'ECT',
        precision: 0,
        verified: true
    });

    var STT = new Currency({
        id: 'CNhUwUpGoMmPxDsqrUsVDa6WDzwZVdh4N8gVA85tBB28',
        displayName: 'SmartTracker',
        shortName: 'STT',
        precision: 0,
        verified: true
    });

    var SCLRI = new Currency({
        id: '4GZ5tgKxPeu5kCYpcAE871grUPXWW3My5uccRVHRJ2k2',
        displayName: 'Clean/Smart City',
        shortName: 'SCLRI',
        precision: 2,
        verified: true
    });

    var Knish = new Currency({
        id: 'CvutHGapUdjVHXZ1KwGUD1Z3R2rwDwwbLJrTXSGUYfuK',
        displayName: 'Knish',
        shortName: 'Knish',
        precision: 8,
        verified: true
    });

    var WPC = new Currency({
        id: 'ANTz8NnpfbEcDFXo4gwd7UL5ugc9bdTcPGbEPktRPZw2',
        displayName: 'whoppercoin',
        shortName: 'WPC',
        precision: 1,
        verified: true
    });

    var cryptoSterling = new Currency({
        id: '61LRXnv6iB2QDwBVi34r6eEyx8h7VZdyBApB4aP9eKqA',
        displayName: 'cryptoSterling',
        shortName: 'cryptoSterling',
        precision: 0,
        verified: true
    });

    var NGN = new Currency({
        id: '6CjhSBXPF2gga6s6F9UkGKAtnYawCqySH1wUJA2cU5pW',
        displayName: '₦ | NGN',
        shortName: 'NGN',
        precision: 2,
        verified: true
    });

    var ALTOCAR = new Currency({
        id: '5ZVP6vp8Rt7GneEozNATcs7LPjQfwTun9WwnN1ispAH4',
        displayName: 'ALTOCAR',
        shortName: 'ALTOCAR',
        precision: 8,
        verified: true
    });

    var ANAT = new Currency({
        id: '7YUrQFP6Fgn8EwbQb3rBtJjBattsvX5B4tsCsJrn14Py',
        displayName: 'ANAT',
        shortName: 'ANAT',
        precision: 8,
        verified: true
    });

    var ATKN = new Currency({
        id: '7U5YKTvz7bt85FyWRB9bvSbqtKcdK3YVJDGfuJ1XjxBh',
        displayName: 'A-TOKEN',
        shortName: 'ATKN',
        precision: 8,
        verified: true
    });

    var ATOM = new Currency({
        id: '83M2vz5tTwovXyW6ytrT7771DsEpttaGyCn66toQmT5N',
        displayName: 'AtomCoinAnn',
        shortName: 'ATOM',
        precision: 2,
        verified: true
    });

    var BAR = new Currency({
        id: 'HU5B3q3neZRpq5R9uzoRjopJUpELtnFmz1KW2TAUbp9m',
        displayName: 'BARCOIN',
        shortName: 'BAR',
        precision: 0,
        verified: true
    });

    var BCF = new Currency({
        id: '6ShaywJbyebptogQ5gMUvtbEyCdXqV4gGPfAPEdq2Dre',
        displayName: 'BCF SHARES',
        shortName: 'BCF',
        precision: 6,
        verified: true
    });

    var BET = new Currency({
        id: 'FkgGR1mYeEdPLrvCRTfQcZeyCadWEVGuryDEhuPuZoUf',
        displayName: 'BET\'s',
        shortName: 'BET',
        precision: 1,
        verified: true
    });

    var BIRTAL = new Currency({
        id: 'J1tggntaeLccEr8t9s8cc9VpqGj3QkHMSrfyEkdGzoXF',
        displayName: 'BirTal',
        shortName: 'BIRTAL',
        precision: 8,
        verified: true
    });

    var BITCHEKE = new Currency({
        id: '9CPQU2EdbYxHsiytpZV4L8cypZHL17B4a81xedpspNT8',
        displayName: 'BitCheke',
        shortName: 'BITCHEKE',
        precision: 3,
        verified: true
    });

    var BITD = new Currency({
        id: 'B5f8oYUingX3XyKjRAcimPapELPfFMhRz6oVzUk5GDW5',
        displayName: 'BITDOLLARS',
        shortName: 'BITD',
        precision: 8,
        verified: true
    });

    var BKC = new Currency({
        id: '2a2AorHdSaWiiTiYR11vEKjLBzsqtQ5i1KzPNfW97xBb',
        displayName: 'Blokcloud',
        shortName: 'BKC',
        precision: 8,
        verified: true
    });

    var CROW = new Currency({
        id: '5XWiXK6RbwXsTnY2dSHQWnKVjvLsMAEeE1rFqQz3Ton2',
        displayName: 'CrowdWave',
        shortName: 'CROW',
        precision: 3,
        verified: true
    });

    var CBT = new Currency({
        id: 'HfTchexAmETtGoPCU1V72t6WNgPPoEsLjBTpeeBzC46L',
        displayName: 'CryptoBazar',
        shortName: 'CBT',
        precision: 4,
        verified: true
    });

    var EDEN = new Currency({
        id: 'HQMz6yc8hxzA3MUvvGSNByxWLMcmt6uoz5ZE3ebkS75n',
        displayName: 'EdenChain',
        shortName: 'EDEN',
        precision: 8,
        verified: true
    });

    var EQUA = new Currency({
        id: 'ECcmoyW2wQcQMvXp3QbwnMFBpiRthHj54MpYq7scQBeZ',
        displayName: 'EquaCoin',
        shortName: 'EQUA',
        precision: 4,
        verified: true
    });

    var EQUILD = new Currency({
        id: 'FrErWYxQojiTVMamqLLvkmeKKX9UTXz8EL9NF3AeYWPi',
        displayName: 'equild',
        shortName: 'EQUILD',
        precision: 8,
        verified: true
    });

    var ETERP = new Currency({
        id: 'BiSYeqfANiJjUjR3GwCaeCPZQaT4Ly1vQb12PcambKbz',
        displayName: 'EterPay',
        shortName: 'ETERP',
        precision: 8,
        verified: true
    });

    var FENIX = new Currency({
        id: '3pEoYCzUb7hWvqoMQGPYffTsxxPDkSzwSskypmYFBLFP',
        displayName: 'FENIX&WAVES',
        shortName: 'FENIX',
        precision: 8,
        verified: true
    });

    var FTB = new Currency({
        id: 'E8jdQECM6i9j28bpH81zZWyAwtaZwJMtzPWz4jCCmot3',
        displayName: 'Fincoin',
        shortName: 'FTB',
        precision: 6,
        verified: true
    });

    var FLEX = new Currency({
        id: 't1ocHkKuQLKYhtH7nm1rYuj1iZ8d75bqAjgRTwiGhQF',
        displayName: 'Flex',
        shortName: 'FLEX',
        precision: 0,
        verified: true
    });

    var FNX = new Currency({
        id: 'RiVZJ25d5vMYcVo4XRK5n2whjh4WwYGshmmwXgF9MK4',
        displayName: 'FNX&WVS',
        shortName: 'FNX',
        precision: 8,
        verified: true
    });

    var GBC = new Currency({
        id: 'byHDS3JprxWhPbuYBy4y4SvYbbvZiAQV9MNiDSsRPz6',
        displayName: 'Goldbar coin',
        shortName: 'GBC',
        precision: 3,
        verified: true
    });

    var Grant = new Currency({
        id: 'C9p15S1PJN4tMeodygkBEEr2GQUX5dtbtuadTcuaj7t5',
        displayName: 'Grant',
        shortName: 'Grant',
        precision: 8,
        verified: true
    });

    var GrantsBounty = new Currency({
        id: '47iX3APMeD4ZGmhQr73qg5boyoJZXGWpfX5sbcAD6jsn',
        displayName: 'GrantsBounty',
        shortName: 'GrantsBounty',
        precision: 8,
        verified: true
    });

    var HEART = new Currency({
        id: '5xFEsfHdtHLZ2yexduffCBqryWxV4Py8FHtA9tLWqtrJ',
        displayName: 'HEART',
        shortName: 'HEART',
        precision: 1,
        verified: true
    });

    var HOME = new Currency({
        id: '9fkbSVSceusGtsL9KxQHCaqpt2ddds6ukMEKrabgdbac',
        displayName: 'HomeToken',
        shortName: 'HOME',
        precision: 8,
        verified: true
    });

    var HTC = new Currency({
        id: '7GCmsbyYBJ9DAJayC3hKuZV4REZXdGdXRjWgsY9oB3wZ',
        displayName: 'HotelCoin',
        shortName: 'HTC',
        precision: 8,
        verified: true
    });

    var IMMO = new Currency({
        id: '8yzwMFmNFAv8VALWfmEPHk26tMv9MBS7eHoTm7i1FXyT',
        displayName: 'Immodestea',
        shortName: 'IMMO',
        precision: 8,
        verified: true
    });

    var JNET = new Currency({
        id: '8FHrsE6ixLyEnbcJqxXaGRcEU2aziuEBvQ6Tebgqrv5c',
        displayName: 'jNetCoin',
        shortName: 'JNET',
        precision: 5,
        verified: true
    });

    var KRIP = new Currency({
        id: 'Hm9DM6i5DsnHoPhxWWo5j2bFYYVCUaoC9n66EtzmwgAM',
        displayName: 'KripCoin',
        shortName: 'KRIP',
        precision: 5,
        verified: true
    });

    var LLA = new Currency({
        id: 'CvD7GedwdeHCxtiiQgbEAV6JHxXv9DQ8bkmrFAauiNyy',
        displayName: 'Lalena (LLA)',
        shortName: 'LLA',
        precision: 8,
        verified: true
    });

    var limburg = new Currency({
        id: 'FYCGQ1iKBqbYnQgeLQFEazw4oF2PyRYhdsUPWBEWk7F6',
        displayName: 'LimburgCoin',
        shortName: 'limburg',
        precision: 8,
        verified: true
    });

    var LIVEBIT = new Currency({
        id: '7W2CHBfQFXfkZVrPWrj34W6pveKHVky9dvoFq1MXNY24',
        displayName: 'LiveBit',
        shortName: 'LIVEBIT',
        precision: 8,
        verified: true
    });

    var MED = new Currency({
        id: 'CnkUwcYpVpzk3mMM2XfofymwXBnmrSecFbBdMx6WYDCa',
        displayName: 'Medicine Man',
        shortName: 'MED',
        precision: 8,
        verified: true
    });

    var MNG = new Currency({
        id: '6672vWQDHDV6WRU4GsRjBYo6444bh2fEWmXW1KnSSrw4',
        displayName: 'Mining',
        shortName: 'MNG',
        precision: 8,
        verified: true
    });

    var MMBT = new Currency({
        id: '82in5zvV8XdnFzCwYWCNaNbRWSvEa4CfCYfJSAaStafH',
        displayName: 'MMBT',
        shortName: 'MMBT',
        precision: 4,
        verified: true
    });

    var MPST = new Currency({
        id: '44n9LfHecPgovJAZtgdqLg9bT4kzRSF2LgGGSnsyojRn',
        displayName: 'MPST',
        shortName: 'MPST',
        precision: 8,
        verified: true
    });

    var MFS = new Currency({
        id: 'A29o9EnYC9rjPnCw4ujrgTze7E3hLstiLeiSeoUbanfv',
        displayName: 'My Fair Share',
        shortName: 'MFS',
        precision: 8,
        verified: true
    });

    var MCS = new Currency({
        id: '4RndW3NAfxHV1xdCn67t4P6prU9B8SyxNTpYFAocmttM',
        displayName: 'MyCryptoSpot',
        shortName: 'MCS',
        precision: 8,
        verified: true
    });

    var NICNAC = new Currency({
        id: 'ENpaU88woC6Q1pbheURcA5TMX7ykhC5zFPqzdVfhP1BC',
        displayName: 'NicNacToken',
        shortName: 'NICNAC',
        precision: 3,
        verified: true
    });

    var NUTS = new Currency({
        id: '67dY6uMTpg9Ks7Abn2muwTyY24qjrhjviKxMfgURQhos',
        displayName: 'Nutshells',
        shortName: 'NUTS',
        precision: 6,
        verified: true
    });

    var OCTANOX = new Currency({
        id: 'DxE8xbjHT7rXyRd2DMz5TnNNNC91Kz1SZ9k4dpH6X4JP',
        displayName: 'Octanox',
        shortName: 'OTX',
        precision: 8,
        verified: true
    });

    var P2P = new Currency({
        id: '6Z2EYvNU447o96Zevei4Zb5rNntENs2br2B5kQ5HXkiq',
        displayName: 'P2P Coin',
        shortName: 'P2P',
        precision: 8,
        verified: true
    });

    var preNEX = new Currency({
        id: 'FBKxJx6Ho6z1bABvGJo1J1sbCrr4Cs3iUTGsxy3suG4F',
        displayName: 'preNEX',
        shortName: 'preNEX',
        precision: 0,
        verified: true
    });

    var preVITO = new Currency({
        id: '6LcUbnDY585ndN8XbHmnbwF8P8BZsoPqzvEyWbjdsrqQ',
        displayName: 'preVITO',
        shortName: 'preVITO',
        precision: 3,
        verified: true
    });

    var PRIMO = new Currency({
        id: '4EmxnV7DhizwpKh5J13Waxovth95uSjknokNFxNAzAaS',
        displayName: 'Primo Coin',
        shortName: 'PRIMO',
        precision: 8,
        verified: true
    });

    var PYTI = new Currency({
        id: 'F6ppo1zRQnMW6VcYRj2LiEqjL6ahvdYU4zNQXWxstLbg',
        displayName: 'Priveleged YTI',
        shortName: 'PYTI',
        precision: 2,
        verified: true
    });

    var PUMP = new Currency({
        id: '5fMUzjhtVkwxyUyDPzSZuCz2HtpesaaTNMTRsFzZvkP',
        displayName: 'Pumpcoin',
        shortName: 'PUMP',
        precision: 8,
        verified: true
    });

    var QUASA = new Currency({
        id: '33GpTrJ72YiDA21nEtssN8jKYf5jwbv8GFH22y37AVjD',
        displayName: 'QuasaCoin',
        shortName: 'QUASA',
        precision: 8,
        verified: true
    });

    var REDFISH = new Currency({
        id: '5sU8dF7DyN7dKN4NiFTtVC5shqthSgTEuvKUu2iusyS2',
        displayName: 'Redfishcoin',
        shortName: 'REDFISH',
        precision: 8,
        verified: true
    });

    var RMOB = new Currency({
        id: 'BmcArNN9VnKAp3HbvpKaoE3utwEXqvP1UjunS9DVKdGS',
        displayName: 'RewardMob',
        shortName: 'RMOB',
        precision: 8,
        verified: true
    });

    var RXSC = new Currency({
        id: 'SGBHnkG1Z8VbEtaCF5gpNihg1SRFky6CzrwmyL8GJnj',
        displayName: 'RxSmartCoffee',
        shortName: 'RXSC',
        precision: 8,
        verified: true
    });

    var SEBEUM = new Currency({
        id: '73XxLgHdzDfus6nRuwpo3dceCRMNiU5VwkiUK1AAfaQk',
        displayName: 'Sebeum',
        shortName: 'SEBEUM',
        precision: 5,
        verified: true
    });

    var SGCN = new Currency({
        id: 'AYMwsNAa4pdg1raJnGvibdLkAhqXQTrXo2SQfecAzfg1',
        displayName: 'SGelderCoin',
        shortName: 'SGCN',
        precision: 8,
        verified: true
    });

    var SHEEP = new Currency({
        id: 'mjkFnVZBdS1VB5MdWjgEFYHyTaoVGuepypLpTEGQdEp',
        displayName: 'Sheepbit',
        shortName: 'SHEEP',
        precision: 8,
        verified: true
    });

    var SGT = new Currency({
        id: 'BPSBJtgWQvx6QqNz9WHEZVhJAmTvGPArQ1Y5nFVkTPAR',
        displayName: 'Snuggoo (SGT)',
        shortName: 'SGT',
        precision: 2,
        verified: true
    });

    var SQUASH = new Currency({
        id: '4Cxj1FfwKWMwfZZ34QxyZtRfUq4jHSmX9pwXafzBzmdC',
        displayName: 'SquashCoin',
        shortName: 'SQUASH',
        precision: 2,
        verified: true
    });

    var SRE = new Currency({
        id: 'BotFPyCivCDaoQHSD3myBw7GAxsZdiRS76G1WdFVuSXC',
        displayName: 'SRE_Token',
        shortName: 'SRE',
        precision: 8,
        verified: true
    });

    var STYLO = new Currency({
        id: '5VRTinDkxBi4oYBSWjkijyZtacH3QVa8Q8qPodhvczv6',
        displayName: 'stylocoin',
        shortName: 'STYLO',
        precision: 4,
        verified: true
    });

    var SXAS = new Currency({
        id: 'EjR1ThR2MBgukq4Z5zhdXzcct2Vzvq1QgnkMjcFRhXio',
        displayName: 'SXAS',
        shortName: 'SXAS',
        precision: 6,
        verified: true
    });

    var TENEBRIS = new Currency({
        id: 'EJs2V3hd6FXGDYH7HKFDhVcgtCmDa31zRygV1KwF5PHS',
        displayName: 'Tenebris',
        shortName: 'TENEBRIS',
        precision: 8,
        verified: true
    });

    var TEXCOIN = new Currency({
        id: '68XWWEmAUoLHXGFy6n8nb6M5c2WrSrekiWSPx8VT7e1e',
        displayName: 'TEXCOIN',
        shortName: 'TEXCOIN',
        precision: 3,
        verified: true
    });

    var Tidals = new Currency({
        id: 'AAUgxEx61UK5Y9MiEYMsdnCqVhGxBcTJEGTMHJeybuBC',
        displayName: 'Tidal Waves',
        shortName: 'Tidals',
        precision: 8,
        verified: true
    });

    var TFT = new Currency({
        id: 'B1u2TBpTYHWCuMuKLnbQfLvdLJ3zjgPiy3iMS2TSYugZ',
        displayName: 'TIMESFARMTOKEN',
        shortName: 'TFT',
        precision: 6,
        verified: true
    });

    var LOYAL = new Currency({
        id: '3YBdrSJjkAfQiFVefJ6vSRLrRtsWfSgjFd2W53oCWpZM',
        displayName: 'tokenloyalty.io',
        shortName: 'LOYAL',
        precision: 8,
        verified: true
    });

    var TOPS = new Currency({
        id: '865pJ6TrYL39oMHoKtxBCNjdYsyMtaymz3doFfbEv5hh',
        displayName: 'TOPS',
        shortName: 'TOPS',
        precision: 5,
        verified: true
    });

    var TRGL = new Currency({
        id: '5i65cqtC1s34YmyUUxFM4ps5DLQHtLvZwCfaPb6QhXdh',
        displayName: 'TRGL',
        shortName: 'TRGL',
        precision: 0,
        verified: true
    });

    var TRUZTAR = new Currency({
        id: '7EHF5yybMR9kkB5Ntz3pqYTQY3zK6a5rHy4gjDYVbWpS',
        displayName: 'Truztar',
        shortName: 'TRUZTAR',
        precision: 8,
        verified: true
    });

    var TWENTYONE = new Currency({
        id: 'Dbd7nKCm9RRq6Vjh9VLumXeEKPZfM4dgox19q7jjHx5L',
        displayName: 'Twenty-One',
        shortName: 'TWENTYONE',
        precision: 8,
        verified: true
    });

    var UOOMAG = new Currency({
        id: 'DgwLgKXfC3G7SKbSoz82ZQVGQNLHqqfEovtdv7sjHGKu',
        displayName: 'UOOMAG',
        shortName: 'UOOMAG',
        precision: 8,
        verified: true
    });

    var VTN = new Currency({
        id: '32gwVYerx37pxuNG6eaiFRdya5ETpH8imNsf31VT5WqH',
        displayName: 'VOLTROON',
        shortName: 'VTN',
        precision: 8,
        verified: true
    });

    var WTC = new Currency({
        id: '7VDRFwm2HbaJCk3U4HQDhLGdSCxZwPe3cHefVXy7ejYe',
        displayName: 'WorldTurtleCoin',
        shortName: 'WTC',
        precision: 8,
        verified: true
    });

    var XVCA = new Currency({
        id: '78op8zPXC1Uf5541a7Pm1SmqrutAC9tsNxbrMTLscoHy',
        displayName: 'XVCA',
        shortName: 'XVCA',
        precision: 3,
        verified: true
    });

    var ANRYZE = new Currency({
        id: 'HXdFUiw5yLLWhkorsRy1E5GttG2QZfzEYAVgEgjBNh8t',
        displayName: 'ANRYZE',
        shortName: 'ANRYZE',
        precision: 8,
        verified: true
    });

    var KLX = new Currency({
        id: '7gMmyXjd4uZwaAFcfrfXQR4fAhDi8waXANb8zjqhRSfq',
        displayName: 'Kylix',
        shortName: 'KLX',
        precision: 2,
        verified: true
    });

    var POST = new Currency({
        id: 'DQUrzGsXp84Z4aPXLEkhgApf8TpCQqtoY87gdwUTurL7',
        displayName: 'NEWS',
        shortName: 'POST',
        precision: 8,
        verified: true
    });

    var TRY = new Currency({
        id: '2mX5DzVKWrAJw8iwdJnV2qtoeVG9h5nTDpTqC1wb1WEN',
        displayName: 'TRY',
        shortName: 'TRY',
        precision: 2,
        verified: true
    });

    var JDC = new Currency({
        id: 'Chs34HQrj37VbWHr8NDZiRZEkyEGBiPowSF4RjrRBCHn',
        displayName: 'JustDatingCoin',
        shortName: 'JDC',
        precision: 8,
        verified: true
    });

    var Blue = new Currency({
        id: 'HkhKVMzWNE7DJ5fZJpwBMs4FMxFwZFFh9UT5GXAVdZvE',
        displayName: 'BlueToken',
        shortName: 'Blue',
        precision: 0,
        verified: true
    });

    var AKCHE = new Currency({
        id: '3ihiQ1TJhe7fBrMc8o9EY8tQNU6phkmp8ZEyvVe4Jfhk',
        displayName: 'AKCHE',
        shortName: 'AKCHE',
        precision: 4,
        verified: true
    });

    var TDX = new Currency({
        id: '3QvxP6YFBKpWJSMAfYtL8Niv8KmmKsnpb9uQwQpg8QN2',
        displayName: 'Tidex',
        shortName: 'TDX',
        precision: 2,
        verified: true
    });

    var InPay = new Currency({
        id: '9pPVf3gcLH3NQA2aYVRcTV2N2i32qBzA5cEMWYqBYfMi',
        displayName: 'InPay',
        shortName: 'InPay',
        precision: 8,
        verified: true
    });

    var LIQUID = new Currency({
        id: '7FzrHF1pueRFrPEupz6oiVGTUZqe8epvC7ggWUx8n1bd',
        displayName: 'Liquid',
        shortName: 'LIQUID',
        precision: 8,
        verified: true
    });

    var TN = new Currency({
        id: 'HxQSdHu1X4ZVXmJs232M6KfZi78FseeWaEXJczY6UxJ3',
        displayName: 'TurtleNode',
        shortName: 'TN',
        precision: 2,
        verified: true
    });

    var ENAN = new Currency({
        id: '53sxSVvj3PJkZhZKz6gLc5coXxAyC7zbgo5RtXfqRsym',
        displayName: 'eco-NAN',
        shortName: 'ENAN',
        precision: 8,
        verified: true
    });

    var ContestCoin = new Currency({
        id: '2ULyqYTJfrDknc2m5iPPkrvpHtRiB57nHag4RCSwZWQS',
        displayName: 'ContestCoin',
        shortName: 'ContestCoin',
        precision: 0,
        verified: true
    });

    var SMQ = new Currency({
        id: 'CBik4JEmsoPZKKATnShULYj2ebUao5aada9N1XGznEET',
        displayName: 'Simdaq Token',
        shortName: 'SMQ',
        precision: 8,
        verified: true
    });

    var DASH = new Currency({
        id: 'B3uGHFRpSUuGEDWjqB9LWWxafQj8VTvpMucEyoxzws5H',
        displayName: 'Dash token',
        shortName: 'DASH',
        precision: 8,
        verified: true
    });

    function isCached(assetId) {
        return currencyCache.hasOwnProperty(assetId);
    }

    function invalidateCache() {
        currencyCache = {};

        currencyCache[WAVES.id] = WAVES;
        currencyCache[BTC.id] = BTC;
        currencyCache[BCH.id] = BCH;
        currencyCache[ETH.id] = ETH;
        currencyCache[LTC.id] = LTC;
        currencyCache[ZEC.id] = ZEC;
        currencyCache[USD.id] = USD;
        currencyCache[EUR.id] = EUR;
        currencyCache[CNY.id] = CNY;
        currencyCache[WCT.id] = WCT;
        currencyCache[MRT.id] = MRT;
        currencyCache[WGO.id] = WGO;
        currencyCache[INCNT.id] = INCNT;
        currencyCache[RBX.id] = RBX;
        currencyCache[MER.id] = MER;
        currencyCache[BAt.id] = BAt;
        currencyCache[UPC.id] = UPC;
        currencyCache[KLN.id] = KLN;
        currencyCache[TKS.id] = TKS;
        currencyCache[WPN.id] = WPN;
        currencyCache[EFYT.id] = EFYT;
        currencyCache[MGO.id] = MGO;
        currencyCache[ETT.id] = ETT;
        currencyCache[ZRC.id] = ZRC;
        currencyCache[PBKX.id] = PBKX;
        currencyCache[PING.id] = PING;
        currencyCache[STAR.id] = STAR;
        currencyCache[BEAR.id] = BEAR;
        currencyCache[DAR.id] = DAR;
        currencyCache[GLIPP.id] = GLIPP;
        currencyCache[mTNT.id] = mTNT;
        currencyCache[BKT.id] = BKT;
        currencyCache[WGR.id] = WGR;
        currencyCache[PBT.id] = PBT;
        currencyCache[PPIO.id] = PPIO;
        currencyCache[STA.id] = STA;
        currencyCache[CORE.id] = CORE;
        currencyCache[KSS.id] = KSS;
        currencyCache[WFN.id] = WFN;
        currencyCache[GRPH.id] = GRPH;
        currencyCache[ESC.id] = ESC;
        currencyCache[AGRO.id] = AGRO;
        currencyCache[KING.id] = KING;
        currencyCache[ARNA.id] = ARNA;
        currencyCache[WNET.id] = WNET;
        currencyCache[PBK.id] = PBK;
        currencyCache[TOM.id] = TOM;
        currencyCache[ViC.id] = ViC;
        currencyCache[EQ.id] = EQ;
        currencyCache[SHDW.id] = SHDW;
        currencyCache[GIN.id] = GIN;
        currencyCache[NEWS.id] = NEWS;
        currencyCache[COXST.id] = COXST;
        currencyCache[SMR.id] = SMR;
        currencyCache[RDT.id] = RDT;
        currencyCache[IRA.id] = IRA;
        currencyCache[_2B4T.id] = _2B4T;
        currencyCache[MBX.id] = MBX;
        currencyCache[KNOWS.id] = KNOWS;
        currencyCache[MBI.id] = MBI;
        currencyCache[COF.id] = COF;
        currencyCache[CHILL.id] = CHILL;
        currencyCache[KUN.id] = KUN;
        currencyCache[CEIT.id] = CEIT;
        currencyCache[SGIT.id] = SGIT;
        currencyCache[AHT.id] = AHT;
        currencyCache[HALAL.id] = HALAL;
        currencyCache[DIMO.id] = DIMO;
        currencyCache[WIN.id] = WIN;
        currencyCache[YTB.id] = YTB;
        currencyCache[GFL.id] = GFL;
        currencyCache[DAT.id] = DAT;
        currencyCache[VK.id] = VK;
        currencyCache[UWT.id] = UWT;
        currencyCache[AP_0.id] = AP_0;
        currencyCache[AP_1.id] = AP_1;
        currencyCache[AP_2.id] = AP_2;
        currencyCache[OCL.id] = OCL;
        currencyCache[OCC.id] = OCC;
        currencyCache[SMART.id] = SMART;
        currencyCache[DCN.id] = DCN;
        currencyCache[RSC.id] = RSC;
        currencyCache[LIKE.id] = LIKE;
        currencyCache[FUPOOF.id] = FUPOOF;
        currencyCache[ANY.id] = ANY;
        currencyCache[BRW.id] = BRW;
        currencyCache[CNX.id] = CNX;
        currencyCache[DARF.id] = DARF;
        currencyCache[WNT.id] = WNT;
        currencyCache[CWV.id] = CWV;
        currencyCache[WCASH.id] = WCASH;
        currencyCache[LIFE.id] = LIFE;
        currencyCache[RDCR.id] = RDCR;
        currencyCache[THNX.id] = THNX;
        currencyCache[IKV.id] = IKV;
        currencyCache[WDESK.id] = WDESK;
        currencyCache[SUR.id] = SUR;
        currencyCache[SIBERIA.id] = SIBERIA;
        currencyCache[MODO.id] = MODO;
        currencyCache[GIVE.id] = GIVE;
        currencyCache[SOL.id] = SOL;
        currencyCache[EOT.id] = EOT;
        currencyCache[FIX.id] = FIX;
        currencyCache[KKO.id] = KKO;
        currencyCache[JNT.id] = JNT;
        currencyCache[CGT.id] = CGT;
        currencyCache[AFFT.id] = AFFT;
        currencyCache[MFL.id] = MFL;
        currencyCache[TURTL.id] = TURTL;
        currencyCache[PropX.id] = PropX;
        currencyCache[ECT.id] = ECT;
        currencyCache[STT.id] = STT;
        currencyCache[SCLRI.id] = SCLRI;
        currencyCache[Knish.id] = Knish;
        currencyCache[WPC.id] = WPC;
        currencyCache[cryptoSterling.id] = cryptoSterling;
        currencyCache[NGN.id] = NGN;
        currencyCache[ALTOCAR.id] = ALTOCAR;
        currencyCache[ANAT.id] = ANAT;
        currencyCache[ATKN.id] = ATKN;
        currencyCache[ATOM.id] = ATOM;
        currencyCache[BAR.id] = BAR;
        currencyCache[BCF.id] = BCF;
        currencyCache[BET.id] = BET;
        currencyCache[BIRTAL.id] = BIRTAL;
        currencyCache[BITCHEKE.id] = BITCHEKE;
        currencyCache[BITD.id] = BITD;
        currencyCache[BKC.id] = BKC;
        currencyCache[CROW.id] = CROW;
        currencyCache[CBT.id] = CBT;
        currencyCache[EDEN.id] = EDEN;
        currencyCache[EQUA.id] = EQUA;
        currencyCache[EQUILD.id] = EQUILD;
        currencyCache[ETERP.id] = ETERP;
        currencyCache[FENIX.id] = FENIX;
        currencyCache[FTB.id] = FTB;
        currencyCache[FLEX.id] = FLEX;
        currencyCache[FNX.id] = FNX;
        currencyCache[GBC.id] = GBC;
        currencyCache[Grant.id] = Grant;
        currencyCache[GrantsBounty.id] = GrantsBounty;
        currencyCache[HEART.id] = HEART;
        currencyCache[HOME.id] = HOME;
        currencyCache[HTC.id] = HTC;
        currencyCache[IMMO.id] = IMMO;
        currencyCache[JNET.id] = JNET;
        currencyCache[KRIP.id] = KRIP;
        currencyCache[LLA.id] = LLA;
        currencyCache[limburg.id] = limburg;
        currencyCache[LIVEBIT.id] = LIVEBIT;
        currencyCache[MED.id] = MED;
        currencyCache[MNG.id] = MNG;
        currencyCache[MMBT.id] = MMBT;
        currencyCache[MPST.id] = MPST;
        currencyCache[MFS.id] = MFS;
        currencyCache[MCS.id] = MCS;
        currencyCache[NICNAC.id] = NICNAC;
        currencyCache[NUTS.id] = NUTS;
        currencyCache[OCTANOX.id] = OCTANOX;
        currencyCache[P2P.id] = P2P;
        currencyCache[preNEX.id] = preNEX;
        currencyCache[preVITO.id] = preVITO;
        currencyCache[PRIMO.id] = PRIMO;
        currencyCache[PYTI.id] = PYTI;
        currencyCache[PUMP.id] = PUMP;
        currencyCache[QUASA.id] = QUASA;
        currencyCache[REDFISH.id] = REDFISH;
        currencyCache[RMOB.id] = RMOB;
        currencyCache[RXSC.id] = RXSC;
        currencyCache[SEBEUM.id] = SEBEUM;
        currencyCache[SGCN.id] = SGCN;
        currencyCache[SHEEP.id] = SHEEP;
        currencyCache[SGT.id] = SGT;
        currencyCache[SQUASH.id] = SQUASH;
        currencyCache[SRE.id] = SRE;
        currencyCache[STYLO.id] = STYLO;
        currencyCache[SXAS.id] = SXAS;
        currencyCache[TENEBRIS.id] = TENEBRIS;
        currencyCache[TEXCOIN.id] = TEXCOIN;
        currencyCache[Tidals.id] = Tidals;
        currencyCache[TFT.id] = TFT;
        currencyCache[LOYAL.id] = LOYAL;
        currencyCache[TOPS.id] = TOPS;
        currencyCache[TRGL.id] = TRGL;
        currencyCache[TRUZTAR.id] = TRUZTAR;
        currencyCache[TWENTYONE.id] = TWENTYONE;
        currencyCache[UOOMAG.id] = UOOMAG;
        currencyCache[VTN.id] = VTN;
        currencyCache[WTC.id] = WTC;
        currencyCache[XVCA.id] = XVCA;
        currencyCache[ANRYZE.id] = ANRYZE;
        currencyCache[KLX.id] = KLX;
        currencyCache[POST.id] = POST;
        currencyCache[TRY.id] = TRY;
        currencyCache[JDC.id] = JDC;
        currencyCache[Blue.id] = Blue;
        currencyCache[AKCHE.id] = AKCHE;
        currencyCache[TDX.id] = TDX;
        currencyCache[InPay.id] = InPay;
        currencyCache[LIQUID.id] = LIQUID;
        currencyCache[TN.id] = TN;
        currencyCache[ENAN.id] = ENAN;
        currencyCache[ContestCoin.id] = ContestCoin;
        currencyCache[SMQ.id] = SMQ;
    }

    invalidateCache();

    return {
        create: function (data) {
            // if currency data.id is not set - it's a temporary instance
            if (!_.has(data, 'id')) {
                return new Currency(data);
            }

            if (!currencyCache[data.id]) {
                currencyCache[data.id] = new Currency(data);
            }

            return currencyCache[data.id];
        },
        invalidateCache: invalidateCache,
        isCached: isCached,
        WAVES: WAVES,
        BTC: BTC,
        BCH: BCH,
        ETH: ETH,
        LTC: LTC,
        ZEC: ZEC,
        USD: USD,
        EUR: EUR,
        CNY: CNY,
        WCT: WCT,
        MRT: MRT,
        WGO: WGO,
        INCNT: INCNT,
        RBX: RBX,
        MER: MER,
        BAt: BAt,
        UPC: UPC,
        KLN: KLN,
        TKS: TKS,
        WPN: WPN,
        EFYT: EFYT,
        MGO: MGO,
        ETT: ETT,
        ZRC: ZRC,
        PBKX: PBKX,
        PING: PING,
        STAR: STAR,
        BEAR: BEAR,
        DAR: DAR,
        GLIPP: GLIPP,
        mTNT: mTNT,
        BKT: BKT,
        WGR: WGR,
        PBT: PBT,
        PPIO: PPIO,
        STA: STA,
        CORE: CORE,
        KSS: KSS,
        WFN: WFN,
        GRPH: GRPH,
        ESC: ESC,
        AGRO: AGRO,
        KING: KING,
        ARNA: ARNA,
        WNET: WNET,
        PBK: PBK,
        TOM: TOM,
        ViC: ViC,
        EQ: EQ,
        SHDW: SHDW,
        GIN: GIN,
        NEWS: NEWS,
        COXST: COXST,
        SMR: SMR,
        RDT: RDT,
        IRA: IRA,
        _2B4T: _2B4T,
        MBX: MBX,
        KNOWS: KNOWS,
        MBI: MBI,
        COF: COF,
        CHILL: CHILL,
        KUN: KUN,
        CEIT: CEIT,
        SGIT: SGIT,
        AHT: AHT,
        HALAL: HALAL,
        DIMO: DIMO,
        WIN: WIN,
        YTB: YTB,
        GFL: GFL,
        DAT: DAT,
        VK: VK,
        UWT: UWT,
        AP_0: AP_0,
        AP_1: AP_1,
        AP_2: AP_2,
        OCL: OCL,
        OCC: OCC,
        SMART: SMART,
        DCN: DCN,
        RSC: RSC,
        LIKE: LIKE,
        FUPOOF: FUPOOF,
        ANY: ANY,
        BRW: BRW,
        CNX: CNX,
        DARF: DARF,
        WNT: WNT,
        CWV: CWV,
        WCASH: WCASH,
        LIFE: LIFE,
        RDCR: RDCR,
        THNX: THNX,
        IKV: IKV,
        WDESK: WDESK,
        SUR: SUR,
        SIBERIA: SIBERIA,
        MODO: MODO,
        GIVE: GIVE,
        SOL: SOL,
        EOT: EOT,
        FIX: FIX,
        KKO: KKO,
        JNT: JNT,
        CGT: CGT,
        AFFT: AFFT,
        MFL: MFL,
        TURTL: TURTL,
        PropX: PropX,
        ECT: ECT,
        STT: STT,
        SCLRI: SCLRI,
        Knish: Knish,
        WPC: WPC,
        cryptoSterling: cryptoSterling,
        NGN: NGN,
        ALTOCAR: ALTOCAR,
        ANAT: ANAT,
        ATKN: ATKN,
        ATOM: ATOM,
        BAR: BAR,
        BCF: BCF,
        BET: BET,
        BIRTAL: BIRTAL,
        BITCHEKE: BITCHEKE,
        BITD: BITD,
        BKC: BKC,
        CROW: CROW,
        CBT: CBT,
        EDEN: EDEN,
        EQUA: EQUA,
        EQUILD: EQUILD,
        ETERP: ETERP,
        FENIX: FENIX,
        FTB: FTB,
        FLEX: FLEX,
        FNX: FNX,
        GBC: GBC,
        Grant: Grant,
        GrantsBounty: GrantsBounty,
        HEART: HEART,
        HOME: HOME,
        HTC: HTC,
        IMMO: IMMO,
        JNET: JNET,
        KRIP: KRIP,
        LLA: LLA,
        limburg: limburg,
        LIVEBIT: LIVEBIT,
        MED: MED,
        MNG: MNG,
        MMBT: MMBT,
        MPST: MPST,
        MFS: MFS,
        MCS: MCS,
        NICNAC: NICNAC,
        NUTS: NUTS,
        OCTANOX: OCTANOX,
        P2P: P2P,
        preNEX: preNEX,
        preVITO: preVITO,
        PRIMO: PRIMO,
        PYTI: PYTI,
        PUMP: PUMP,
        QUASA: QUASA,
        REDFISH: REDFISH,
        RMOB: RMOB,
        RXSC: RXSC,
        SEBEUM: SEBEUM,
        SGCN: SGCN,
        SHEEP: SHEEP,
        SGT: SGT,
        SQUASH: SQUASH,
        SRE: SRE,
        STYLO: STYLO,
        SXAS: SXAS,
        TENEBRIS: TENEBRIS,
        TEXCOIN: TEXCOIN,
        Tidals: Tidals,
        TFT: TFT,
        LOYAL: LOYAL,
        TOPS: TOPS,
        TRGL: TRGL,
        TRUZTAR: TRUZTAR,
        TWENTYONE: TWENTYONE,
        UOOMAG: UOOMAG,
        VTN: VTN,
        WTC: WTC,
        XVCA: XVCA,
        ANRYZE: ANRYZE,
        KLX: KLX,
        POST: POST,
        TRY: TRY,
        JDC: JDC,
        Blue: Blue,
        AKCHE: AKCHE,
        TDX: TDX,
        InPay: InPay,
        LIQUID: LIQUID,
        TN: TN,
        ENAN: ENAN,
        ContestCoin: ContestCoin,
        SMQ: SMQ,
        DASH: DASH
    };
})();

var Money = function(amount, currency) {
    var DECIMAL_SEPARATOR = '.';
    var THOUSANDS_SEPARATOR = ',';

    if (amount === undefined)
        throw Error('Amount is required');

    if (currency === undefined)
        throw Error('Currency is required');

    this.amount = new Decimal(amount)
        .toDecimalPlaces(currency.precision, Decimal.ROUND_FLOOR);
    this.currency = currency;

    var integerPart = function (value) {
        return value.trunc();
    };

    var fractionPart = function (value) {
        return value.minus(integerPart(value));
    };

    var format = function (value) {
        return value.toFixed(currency.precision, currency.roundingMode);
    };

    var validateCurrency = function (expected, actual) {
        if (expected.id !== actual.id)
            throw new Error('Currencies must be the same for operands. Expected: ' +
                expected.displayName + '; Actual: ' + actual.displayName);
    };

    var fromTokensToCoins = function (valueInTokens, currencyPrecision) {
        return valueInTokens.mul(Math.pow(10, currencyPrecision)).trunc();
    };

    var fromCoinsToTokens = function (valueInCoins, currencyPrecision) {
        return valueInCoins.trunc().div(Math.pow(10, currencyPrecision));
    };

    // in 2016 Safari doesn't support toLocaleString()
    // that's why we need this method
    var formatWithThousandsSeparator = function (formattedAmount) {
        var parts = formattedAmount.split(DECIMAL_SEPARATOR);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

        return parts.join(DECIMAL_SEPARATOR);
    };

    this.formatAmount = function (stripZeroes, useThousandsSeparator) {
        var result = stripZeroes ?
            this.toTokens().toFixed(this.amount.decimalPlaces()) :
            format(this.amount);

        return useThousandsSeparator ? formatWithThousandsSeparator(result) : result;
    };

    this.formatIntegerPart = function () {
        return integerPart(this.amount).toFixed(0);
    };

    this.formatFractionPart = function () {
        var valueWithLeadingZero = format(fractionPart(this.amount));

        return valueWithLeadingZero.slice(1); // stripping the leading zero
    };

    this.toTokens = function () {
        var result = fromCoinsToTokens(fromTokensToCoins(this.amount, this.currency.precision),
            this.currency.precision);

        return result.toNumber();
    };

    this.toCoins = function () {
        return fromTokensToCoins(this.amount, this.currency.precision).toNumber();
    };

    this.plus = function (money) {
        validateCurrency(this.currency, money.currency);

        return new Money(this.amount.plus(money.amount), this.currency);
    };

    this.minus = function (money) {
        validateCurrency(this.currency, money.currency);

        return new Money(this.amount.minus(money.amount), this.currency);
    };

    this.greaterThan = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.greaterThan(other.amount);
    };

    this.greaterThanOrEqualTo = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.greaterThanOrEqualTo(other.amount);
    };

    this.lessThan = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.lessThan(other.amount);
    };

    this.lessThanOrEqualTo = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.lessThanOrEqualTo(other.amount);
    };

    this.multiply = function (multiplier) {
        if (!_.isNumber(multiplier))
            throw new Error('Number is expected');

        if (isNaN(multiplier))
            throw new Error('Multiplication by NaN is not supported');

        return new Money(this.amount.mul(multiplier), this.currency);
    };

    this.toString = function () {
        return this.formatAmount(false, true) + ' ' + this.currency.toString();
    };

    return this;
};

Money.fromTokens = function (amount, currency) {
    return new Money(amount, currency);
};

Money.fromCoins = function (amount, currency) {
    currency = currency || {};
    if (currency.precision === undefined)
        throw new Error('A valid currency must be provided');

    amount = new Decimal(amount);
    amount = amount.div(Math.pow(10, currency.precision));

    return new Money(amount, currency);
};

// set up decimal to format 0.00000001 as is instead of 1e-8
Decimal.config({toExpNeg: -(Currency.WAVES.precision + 1)});

