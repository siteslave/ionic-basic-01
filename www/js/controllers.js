angular.module('starter.controllers', ['starter.services.Login'])
.controller('DetailCtrl', function ($scope, $rootScope, $stateParams) {
  var idx = $stateParams.idx;
  console.log($rootScope.users[idx]);
  $scope.user = $rootScope.users[idx];
})
.controller('DashCtrl', function($scope, $rootScope, $window, $state) {
    if (!$window.sessionStorage.getItem('logged')) {
      $state.go('login');
    }

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
