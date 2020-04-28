(function() {
    'use strict';

    angular
        .module('waves.core.constants', [])
        .constant('constants.network', {
            NETWORK_NAME: 'devel', // 'devnet', 'testnet', 'mainnet'
            ADDRESS_VERSION: 1,
            NETWORK_CODE: 'T',
            INITIAL_NONCE: 0
        });

    angular
        .module('waves.core.constants')
        .constant('constants.address', {
            RAW_ADDRESS_LENGTH : 35,
            ADDRESS_PREFIX: '1W',
            MAINNET_ADDRESS_REGEXP: /^[a-zA-Z0-9]{35}$/
        });

    angular
        .module('waves.core.constants')
        .constant('constants.features', {
            ALIAS_VERSION: 2
        });

    angular
        .module('waves.core.constants')
        .constant('constants.ui', {
            MINIMUM_PAYMENT_AMOUNT : 1e-8,
            MINIMUM_TRANSACTION_FEE : 0.001,
            AMOUNT_DECIMAL_PLACES : 8,
            JAVA_MAX_LONG: 9223372036854775807,
            MAXIMUM_ATTACHMENT_BYTE_SIZE: 140
        });

    angular
        .module('waves.core.constants')
        .constant('constants.transactions', {
            PAYMENT_TRANSACTION_TYPE : 2,
            ASSET_ISSUE_TRANSACTION_TYPE: 3,
            ASSET_TRANSFER_TRANSACTION_TYPE: 4,
            ASSET_REISSUE_TRANSACTION_TYPE: 5,
            ASSET_BURN_TRANSACTION_TYPE: 6,
            EXCHANGE_TRANSACTION_TYPE: 7,
            START_LEASING_TRANSACTION_TYPE: 8,
            CANCEL_LEASING_TRANSACTION_TYPE: 9,
            CREATE_ALIAS_TRANSACTION_TYPE: 10,
            MASS_PAYMENT_TRANSACTION_TYPE: 11,
            DATA_TRANSACTION_TYPE: 12,
            SCRIPT_TRANSFER_TRANSACTION_TYPE: 13,
            SPONSOR_FEE_TRANSACTION_TYPE: 14
        });
})();
