angular.module('starter.controllers', ['starter.services.Users'])

.controller('DetailCtrl', function ($scope, $state, $rootScope, $stateParams, UserService, $cordovaCamera) {
  var username = $stateParams.username;

  UserService.detail($rootScope.db, username)
  .then(function (rows) {
    console.log(rows.item(0));
    $scope.username = rows.item(0).username;
    $scope.password = rows.item(0).password;
    $scope.fullname = rows.item(0).fullname;
    $scope.sex = rows.item(0).sex;
    $scope.birthdate = new Date(rows.item(0).birthdate);
    $scope.img = "data:image/jpeg;base64," + rows.item(0).image;
    $scope.image_data = rows.item(0).image;
    $scope.telephone = rows.item(0).telephone;

  }, function (err) {
    console.log(err);
  });

  $scope.takePhoto = function () {
    var options = {
          quality: 100,
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
    user.telephone = $scope.telephone;

    UserService.update($rootScope.db, user)
    .then(function () {
      $state.go('tab.dash')
    }, function (err) {
      console.log(err);

    })

  }

})

.controller('DashCtrl', function($scope, $rootScope, $window, $state, UserService, $ionicLoading) {
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

      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner> Loading...'
      });

      UserService.all(db)
      .then(function (users) {
        for(var i = 0; i <= users.length - 1; i++) {
          //$scope.users.push(users.item(i));
          var obj = {};
          obj.username = users.item(i).username;
          obj.fullname = users.item(i).fullname;
          obj.image = "data:image/jpeg;base64," + users.item(i).image;
          obj.telephone = users.item(i).telephone;
          $scope.users.push(obj);
        }

        $ionicLoading.hide();

      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
        alert(JSON.stringify(err));
      })
    }
})

.controller('NewCtrl', function($scope, $rootScope, $state, $cordovaCamera, UserService, $ionicLoading) {

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
    $ionicLoading.show({
      template: 'Loading...'
    });

    var user = {};
    user.fullname = $scope.fullname;
    user.username = $scope.username;
    user.password = $scope.password;
    user.sex = $scope.sex;
    user.birthdate = $scope.birthdate;
    user.image = $scope.image_data;
    user.telephone = $scope.telephone;

    UserService.save($rootScope.db, user)

    .then(function () {
      $ionicLoading.hide();
      $state.go('tab.dash')
    }, function (err) {
      alert('Error');
      console.log(err);
    })
  }

});
