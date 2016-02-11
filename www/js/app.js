
angular.module('MyApp', [
  'ionic', 'starter.controllers', 'starter.services', 'ngCordova'
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

    $rootScope.db = $cordovaSQLite.openDB({ name: "myusers.db" });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/tab/dash');
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
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
