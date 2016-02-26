projectOneApp.service('dataService', function($http, $q) {
  return {
    'getIsins': function() {
      var defer = $q.defer();
      $http.get('/bond/list').success(function(resp) {
        defer.resolve(resp);
      }).error(function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'updateRow': function(row) {
      var defer = $q.defer();
      $http.post('/bond/updateRow', row).success(function(resp) {
        defer.resolve(resp);
      }).error(function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  };
});