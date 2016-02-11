angular.module('starter.controllers.Login', [])
.controller('LoginCtrl', function($scope, $rootScope, $state, $window, LoginService) {

  LoginService.initialDb($rootScope.db);

  $scope.login = function () {
    LoginService.login($rootScope.db, $scope.username, $scope.password)
    .then(function (user) {
      console.log(user.item(0));
    }, function (err) {
      console.log(err);
    });
  }
})
