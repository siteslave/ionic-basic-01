angular.module('starter.controllers.Login', ['starter.services.Login'])
.controller('LoginCtrl', function($scope, $rootScope, $state, $window, LoginService) {

  //LoginService.initialDb($rootScope.db);

  $scope.login = function () {
    LoginService.login($rootScope.db, $scope.username, $scope.password)
    .then(function (user) {
      //console.log(user.item(0));
      if (user.length) {
        $window.sessionStorage.setItem('fullname', user.item(0).fullname);
        $window.sessionStorage.setItem('username', user.item(0).username);
        $window.sessionStorage.setItem('logged', true);
        $state.go('tab.dash');
      } else {
        alert('Invalid Username/Password');
      }
    }, function (err) {
      console.log(err);
    });
  }
})
