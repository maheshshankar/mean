/**
 * Created by vemulma on 1/31/2017.
 */

(function(){
    'use strict';

    require('bootstrap');
    var ngModule = 'shopApp';
    var angular = require('angular');
    var definitions = require('./defs/main-defs');

    var ngDependency = [];

    var moduleObject = angular.module(ngModule, ngDependency);

    var appInitializerDefinition =
        [
            '$log',
            '$rootScope',
            definitions.initializeApp
        ];

    moduleObject.run(appInitializerDefinition);

    definitions.bootstrapApp(ngModuleName);

})();