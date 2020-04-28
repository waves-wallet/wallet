(function () {
    'use strict';

    var url = 'https://support.waveswallet.io';

    function SupportLinkController() {}

    angular
        .module('app.shared')
        .component('wavesSupportLink', {
            controller: SupportLinkController,
            template: '<a href="' + url + '" target="_blank">' + url + '</a>'
        });
})();
