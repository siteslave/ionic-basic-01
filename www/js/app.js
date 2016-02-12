
angular.module('MyApp', [
  'ionic', 'starter.controllers', 'ngCordova', 'starter.controllers.Login'
])

.run(function($ionicPlatform, $rootScope, $cordovaSQLite, $http) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.db = $cordovaSQLite.openDB({ name: "myusers2.db" });

    var sqlDrop = 'DROP TABLE IF EXISTS users';
    var sqlCreateTable = 'CREATE TABLE IF NOT EXISTS users(username text, password text, fullname text, sex text, birthdate text, telephone, image text)';
    var sqlInserUser = 'INSERT INTO users(username, password, fullname, sex, telephone)  VALUES (?, ?, ?, ?, ?)';

    $cordovaSQLite.execute($rootScope.db, sqlDrop, [])
    .then(function(res) {
      return $cordovaSQLite.execute($rootScope.db, sqlCreateTable, []);
    })
    $cordovaSQLite.execute($rootScope.db, sqlCreateTable, [])
    .then(function () {
      return $cordovaSQLite.execute($rootScope.db, sqlInserUser, ['admin', '123456', 'Satit Rianpit', '1', '1234567890']);
    }).then(function (res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.log(err);
    });

    // push

    var push = PushNotification.init({
        android: {
            senderID: "489756813528"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function(data) {
      console.log(data);
      // data.registrationId
      $http.post('http://192.168.1.50:3000/register', {regid: data.registrationId})
      .success(function () {
        //
      });
    });

    push.on('notification', function(data) {
      console.log(data);
      alert(data.message);
    });

    push.on('error', function(e) {
        console.log(e);
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/intro');
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html'
  })

  .state('sample', {
    url: '/sample',
    templateUrl: 'templates/sample.html'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.new', {
      url: '/new', //  /tab/chats
      views: {
        'tab-new': {
          templateUrl: 'templates/tab-new.html',
          controller: 'NewCtrl'
        }
      }
    })
    .state('tab.detail', {
        url: '/detail/:username',
        views: {
          'tab-dash': {
            templateUrl: 'templates/user-detail.html',
            controller: 'DetailCtrl'
          }
        }
      });

});
