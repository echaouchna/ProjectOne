projectOneApp.controller('dataController', ['$scope', '$rootScope', 'dataService', '$filter', '$timeout', function($scope, $rootScope, dataService, $filter, $timeout) {

  $scope.data = [];

  $scope.head = {
    isin: "Isin",
    alive: "Alive",
    has_ts: "Has TS",
    last_update_date: "TS last update",
    close_date: "Close date"
  };

  $scope.pageSizes = [
    3,
    5,
    10,
    25,
    100,
    500
  ];

  $scope.aliveOptions = [{
    value: false,
    label: 'false'
  }, {
    value: true,
    label: 'true'
  }, ];

  $scope.sort = {
    column: 'isin',
    descending: false
  };

  $scope.totalItems = 0;
  $scope.currentPage = 0;
  $scope.perPageSize = 3;

  $scope.update = function(row) {
    dataService.updateRow(row).then(function(response) {
      row.close_date = response.close_date;
    });
  };

  $scope.getDataPromise = dataService.getIsins().then(function(response) {
    $scope.data = response;
    $scope.filtered = $filter('filter')($scope.data, $scope.searchObject);
    $scope.totalItems = $scope.filtered.length;
    if ($scope.totalItems > 0) {
      $scope.currentPage = 1;
    }
  });

  var poll = function() {
    $timeout(function() {
      dataService.getIsins().then(function(response) {
        $scope.data = response;
        $scope.filtered = $filter('filter')($scope.data, $scope.searchObject);
        $scope.totalItems = $scope.filtered.length;
        if ($scope.totalItems === 0) {
          $scope.currentPage = 0;
        }
      });
      poll();
    }, 10000);
  };

  poll();

  $scope.paginate = function(value, i, list) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.perPageSize;
    end = begin + $scope.perPageSize;
    index = list.indexOf(value);
    return (begin <= index && index < end);
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };

  $scope.nextPage = function() {
    var numberOfPages = Math.ceil($scope.filtered.length / $scope.perPageSize);
    if ($scope.currentPage < numberOfPages) {
      $scope.currentPage++;
    }
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

  $scope.isLastPage = function() {
    var numberOfPages = Math.ceil($scope.filtered.length / $scope.perPageSize);
    return numberOfPages === $scope.currentPage;
  }

  $scope.range = function() {
    var ret = [];
    var numberOfPages = Math.ceil($scope.totalItems / $scope.perPageSize);
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

  $scope.setPageSize = function(size) {
    $scope.perPageSize = size;
  };

  $scope.selectedCls = function(column) {
    if (column == $scope.sort.column) {
      return $scope.sort.descending ? "fa-sort-alpha-desc" : "fa-sort-alpha-asc";
    }
    return "fa-sort";
  };

  $scope.changeSorting = function(column) {
    var sort = $scope.sort;
    if (sort.column == column) {
      sort.descending = !sort.descending;
    } else {
      sort.column = column;
      sort.descending = false;
    }
  };

  $scope.$watch('searchObject', function(newVal, oldVal) {
    $scope.filtered = $filter('filter')($scope.data, newVal);
    $scope.totalItems = $scope.filtered.length;
    if ($scope.totalItems > 0) {
      $scope.currentPage = 1;
    }
  }, true);

}]);