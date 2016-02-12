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
      var sql = 'INSERT INTO users (username, password, fullname, sex, birthdate, image, telephone) VALUES (?, ?, ?, ?, ?, ?, ?)';

      $cordovaSQLite.execute(db, sql, [user.username, user.password, user.fullname, user.sex, user.birthdate, user.image, user.telephone])
      .then(function (res) {
        q.resolve(res); // success
      }, function (err) {
        q.reject(err); // error
      });
      
      return q.promise;
    },

    update: function (db, user) {
      var q = $q.defer();
      var sql = 'UPDATE users SET password=?, fullname=?, sex=?, birthdate=?, image=?, telephone=? WHERE username=?';

      $cordovaSQLite.execute(db, sql, [user.password, user.fullname, user.sex, user.birthdate, user.image, user.username, user.telephone])
      .then(function () {
        q.resolve();
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    },

    detail: function (db, username) {
      var q = $q.defer();
      var sql = 'SELECT * FROM users WHERE username=?';

      $cordovaSQLite.execute(db, sql, [username])
      .then(function (res) {
        q.resolve(res.rows);
      }, function (err) {
        q.reject(err);
      });
      return q.promise;
    }
  }
})
