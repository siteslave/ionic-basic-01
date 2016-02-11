angular.module('starter.services.Login', [])

.factory('LoginService', function($q, $cordovaSQLite) {

  return {
    login: function (db, username, password) {
      var q = $q.defer();
      var sql = 'SELECT * FROM users WHERE username=? AND password=?';
      $cordovaSQLite.execute(db, sql, [username, password])
      .then(function (result) {
        q.resolve(result.rows)
      }, function (err) {
        q.reject(err)
      });

      return q.promise;
    },

    all: function () {
      return [];
    }
  }

});
