angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $window) {

  $scope.login = function () {
    if ($scope.username == 'admin' && $scope.password == "123456") {
      $window.sessionStorage.setItem('logged', true);
      $state.go('tab.dash')
    } else {
      alert('Incorect username/password')
    }
  }
})

.controller('DashCtrl', function($scope, $window, $state) {
    if (!$window.sessionStorage.getItem('logged')) {
      $state.go('login');
    }
})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
