projectOneApp.controller('dataController', ['$scope', '$rootScope', 'dataService', function($scope, $rootScope, dataService) {
  $scope.user = undefined;

  $scope.data = [];

  $scope.aliveOptions = [{
    value: false,
    label: 'false'
  }, {
    value: true,
    label: 'true'
  }, ];

  $scope.update = function(row) {
    dataService.updateRow(row).then(function(response) {
      row.close_date = response.close_date;
    });
  };

  dataService.getIsins().then(function(response) {
    $scope.data = response;
  });

}]);