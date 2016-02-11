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

    $scope.$on('$ionicView.enter', function(){
      $scope.getList();
    });
    
    $scope.logout = function () {
      $window.sessionStorage.removeItem('logged');
      $window.sessionStorage.removeItem('fullname');
      $window.sessionStorage.removeItem('username');

      $state.go('login');
    }

    var db = $rootScope.db;

    $scope.users = [];

    $scope.getList = function () {
      $scope.users = [];

      UserService.all(db)
      .then(function (users) {
        for(var i = 0; i <= users.length - 1; i++) {
          //$scope.users.push(users.item(i));
          var obj = {};
          obj.username = users.item(i).username;
          obj.fullname = users.item(i).fullname;
          obj.image = "data:image/jpeg;base64," + users.item(i).image;
          $scope.users.push(obj);
        }
      }, function (err) {
        console.log(err);
        alert(JSON.stringify(err));
      })
    }
})

.controller('NewCtrl', function($scope, $rootScope, $state, $cordovaCamera, UserService) {

  $scope.takePhoto = function () {
    var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.image_data = imageData;
          $scope.img = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });
  };

  $scope.save = function () {
    var user = {};
    user.fullname = $scope.fullname;
    user.username = $scope.username;
    user.password = $scope.password;
    user.sex = $scope.sex;
    user.birthdate = $scope.birthdate;
    user.image = $scope.image_data;

    UserService.save($rootScope.db, user)
    .then(function () {
      $state.go('tab.dash')
    }, function (err) {
      alert('Error');
      console.log(err);
    })

  }

});
