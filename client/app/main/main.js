'use strict';

angular.module('bcpSpApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/home',
      template: '<main></main>'
    });
  });
