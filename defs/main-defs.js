/**
 * Created by vemulma on 1/31/2017.
 */
(function () {
    'use strict';

    var definitions = {
        initializeApp: function (logger, globalViewModel) {
            var validation = logger && globalViewModel;

            if (validation) {
                globalViewModel.appInitTime = new Date();

                logger.info('Application Initialized!');
            }
        },
        bootstrapApp: function (moduleName) {
            var angular = require('angular');

            angular.element(document)
                .ready(function () {
                    angular.bootstrap(document, [moduleName]);
                });
        }

    };

    module.exports = definitions;
})();