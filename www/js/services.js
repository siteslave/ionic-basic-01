angular.module('starter.services', [])

.factory('Users', function($q) {

  return {
    initialDb: function (db) {
      var q = $q.defer();

      var sqlCreateUser = 'CREATE TABLE IF NOT EXIST users(id integer primary key, username text, password text, fullname text, sex text, birthdate text, image text)';
      var sqlInserUser = 'INSERT INTO users(username, password, fullname, sex) VALUES("admin", "123456", "สถิตย์ เรียนพิศ", "1")';

      
    },
    all: function () {
      return users;
    }
  }

});
