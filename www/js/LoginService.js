angular.module('starter.services.Login', [])

.factory('LoginService', function($q, $cordovaSQLite) {

  return {
    initialDb: function (db) {
      var q = $q.defer();

      db.transaction(function (tx) {
        tx.executeSql(sqlDrop);
        tx.executeSql(sqlCreateTable);
        tx.executeSql(sqlInserUser);
        q.resolve()
      }, function (err) {
        q.reject(err)
      });

      return q.promise;

    },

    login: function (db, username, password) {
      var q = $q.defer();
      var sql = 'SELECT * FROM users WHERE username=? AND password=?';
      db.executeSql(sql, [username, password], function (result) {
        // success
        console.log(result.rows.length);
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
