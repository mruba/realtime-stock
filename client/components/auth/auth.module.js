'use strict';

angular.module('bcpSpApp.auth', ['bcpSpApp.constants', 'bcpSpApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
