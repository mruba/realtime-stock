'use strict';

angular.module('bcpSpApp', ['bcpSpApp.auth', 'bcpSpApp.admin', 'bcpSpApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap', 'ngMaterial', 'ngHamburger',
    'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');

    $locationProvider.html5Mode(true);
  });
  // .config(function($mdThemingProvider, $mdIconProvider){
  //
  //     $mdIconProvider
  //         .defaultIconSet("./assets/svg/avatars.svg", 128)
  //         .icon("menu"       , "./assets/svg/menu.svg"        , 24)
  //         .icon("share"      , "./assets/svg/share.svg"       , 24)
  //         .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
  //         .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
  //         .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
  //         .icon("phone"      , "./assets/svg/phone.svg"       , 512);
  //
  //         $mdThemingProvider.theme('default')
  //             .primaryPalette('brown')
  //             .accentPalette('red');
  //
  // });
