'use strict';

var projectOneApp = angular.module('projectOneApp', []);

projectOneApp.controller('authController', ['$scope', '$rootScope', 'authService', function($scope, $rootScope, authService) {
  $scope.user = undefined;

  $scope.data = [{
    value: "New",
    onclick: "CreateNewDoc"
  }, {
    value: "Open",
    onclick: "OpenDoc"
  }, {
    value: "Close",
    onclick: "CloseDoc"
  }];

  authService.getUser().then(function(response) {
    $scope.user = response;
  });
}]);