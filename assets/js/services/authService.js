projectOneApp.service('authService', function($http, $q) {
  return {
    'getUser': function() {
      var defer = $q.defer();
      $http.get('/me').success(function(resp) {
        defer.resolve(resp);
      }).error(function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  };
});