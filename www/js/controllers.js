angular.module('starter.controllers', ['starter.services.Users'])
.controller('DetailCtrl', function ($scope, $rootScope, $stateParams) {
  var idx = $stateParams.idx;
  console.log($rootScope.users[idx]);
  $scope.user = $rootScope.users[idx];
})
.controller('DashCtrl', function($scope, $rootScope, $window, $state, UserService) {
    if (!$window.sessionStorage.getItem('logged')) {
      $state.go('login');
    }

    $scope.logout = function () {
      $window.sessionStorage.removeItem('logged');
      $window.sessionStorage.removeItem('fullname');
      $window.sessionStorage.removeItem('username');

      $state.go('login');
    }

    $scope.users = [];

    var db = $rootScope.db;
    UserService.all(db)
    .then(function (users) {
      for(var i = 0; i <= users.length - 1; i++) {
        $scope.users.push(users.item(i));
      }
    }, function (err) {
      console.log(err);
      alert(JSON.stringify(err));
    })
})

.controller('NewCtrl', function($scope, $rootScope, $state) {
  $scope.save = function () {
    /*
    {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }
    */
    var user = {};
    user.id = $scope.id;
    user.name = $scope.name;
    user.lastText = $scope.lastText;
    user.face = $scope.face;

    $rootScope.users.push(user);
    $state.go('tab.dash');
    //
    // var user = {
    //   id: $scope.id,
    //   name: $scope.name,
    //   lastText: $scope.lastText,
    //   face: $scope.face
    // }
    //
  }

});
