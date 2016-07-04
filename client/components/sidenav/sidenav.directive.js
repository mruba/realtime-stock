'use strict';

angular.module('bcpSpApp')
  .directive('sidenav', () => ({

      templateUrl: 'components/sidenav/sidenav.html',
      restrict: 'E',
      controller: 'SideNavController',
      controllerAs: 'nav'

  }));
