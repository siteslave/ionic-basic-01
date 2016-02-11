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
    },

    save: function (db, user) {
      var q = $q.defer();
      var sql = 'INSERT INTO users (username, password, fullname, sex, birthdate, image) VALUES (?, ?, ?, ?, ?, ?)';

      $cordovaSQLite.execute(db, sql, [user.username, user.password, user.fullname, user.sex, user.birthdate, user.image])
      .then(function () {
        q.resolve();
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
})
