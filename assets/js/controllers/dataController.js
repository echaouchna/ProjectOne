projectOneApp.controller('dataController', ['$scope', '$rootScope', 'dataService', '$filter', function($scope, $rootScope, dataService, $filter) {
  $scope.user = undefined;

  $scope.data = [];

  $scope.aliveOptions = [{
    value: false,
    label: 'false'
  }, {
    value: true,
    label: 'true'
  }, ];

  $scope.totalItems = 0;
  $scope.currentPage = 0;
  $scope.numPerPage = 3;

  $scope.update = function(row) {
    dataService.updateRow(row).then(function(response) {
      row.close_date = response.close_date;
    });
  };

  dataService.getIsins().then(function(response) {
    $scope.data = response;
    $scope.filtered = $filter('filter')($scope.data, $scope.searchObject);
    $scope.totalItems = $scope.filtered.length;
    if ($scope.totalItems > 0) {
      $scope.currentPage = 1;
    }
  });

  $scope.paginate = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.filtered.indexOf(value);
    return (begin <= index && index < end);
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };

  $scope.nextPage = function() {
    var numberOfPages = Math.ceil($scope.data.length / $scope.numPerPage);
    if ($scope.currentPage < numberOfPages) {
      $scope.currentPage++;
    }
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

  $scope.range = function() {
    var ret = [];
    var numberOfPages = Math.ceil($scope.totalItems / $scope.numPerPage);
    if (numberOfPages < $scope.currentPage) {
      $scope.currentPage = 1;
    }
    var start = $scope.currentPage - 2;
    var gap = 2;
    if (start < 1) {
      gap += 1 - start;
      start = 1;
    }
    if (start + gap > numberOfPages) {
      gap = numberOfPages - $scope.currentPage;
    }
    var end = $scope.currentPage + gap;
    for (var i = start; i <= end; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.$watch('searchObject', function(newVal, oldVal) {
    $scope.filtered = $filter('filter')($scope.data, newVal);
    $scope.totalItems = $scope.filtered.length;
    if ($scope.totalItems > 0) {
      $scope.currentPage = 1;
    }
  }, true);

}]);