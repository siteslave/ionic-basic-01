
angular.module('MyApp', [
  'ionic', 'starter.controllers', 'ngCordova', 'starter.controllers.Login'
])

.run(function($ionicPlatform, $rootScope, $cordovaSQLite) {
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

    //var sqlDrop = 'SELECT  users';
    var sqlCreateTable = 'CREATE TABLE IF NOT EXISTS users(username text, password text, fullname text, sex text, birthdate text, image text)';
    var sqlInserUser = 'INSERT INTO users(username, password, fullname, sex)  VALUES (?, ?, ?, ?)';

    // $cordovaSQLite.execute($rootScope.db, sqlDrop, [])
    // .then(function(res) {
    //   return $cordovaSQLite.execute($rootScope.db, sqlCreateTable, []);
    // })
    $cordovaSQLite.execute($rootScope.db, sqlCreateTable, [])
    .then(function () {
      return $cordovaSQLite.execute($rootScope.db, sqlInserUser, ['admin', '123456', 'Satit Rianpit', '1']);
    }).then(function (res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.log(err);
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
        url: '/detail/:idx', //  /tab/chats
        views: {
          'tab-dash': {
            templateUrl: 'templates/user-detail.html',
            controller: 'DetailCtrl'
          }
        }
      });

});
