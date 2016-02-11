angular.module('starter.services.Users', [])
.factory('UserService', function ($q, $cordovaSQLite, $window) {
  return {
    all: function (db) {
      var q = $q.defer();
      var sql = 'SELECT * FROM users';

      $cordovaSQLite.execute(db, sql, [])
      .then(function (result) {
        q.resolve(result.rows);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
})
