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

  $scope.isAuthenticated = function() {
    return $scope.user;
  };

  $scope.getUsername = function() {
    return $scope.user === undefined ? "" : $scope.user.username;
  };

  authService.getUser().then(function(response) {
    $scope.user = response;
  });

}]);