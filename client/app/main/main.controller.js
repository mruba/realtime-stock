'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, $mdSidenav) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.mdSidenav = $mdSidenav;

      
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }



    openLeftMenu() {
       this.mdSidenav('left').toggle();
     }

    $onInit() {

      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('bcpSpApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
