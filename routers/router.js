
var routerApp = angular.module('routerApp', 
	[
  'Tabletop',
	'ngResource', 
	'ngRoute',
  'ngCookies',
  'angular-loading-bar', 
  'blockUI',
  'ng-isotope',
  'Gdoc',
  'pageService',
  'ui.bootstrap'
	]);

routerApp

  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://script.googleusercontent.com**', 'http://drive.google.com/**', 'https://docs.google.com/**']);
     }])

// Progress bar site load
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    // cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 50;
    // cfpLoadingBarProvider.includeSpinner = true;
  }])

 // Block Ui load element
  .config(function(blockUIConfig) {
    // Change the default overlay message
    // blockUIConfig.message = 'Please stop clicking!';
    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 100;
})

// Router provider
  .config(function($routeProvider) {
      $routeProvider
      .when('/',
      {
          controller: 'mainController',
          templateUrl: 'partial/main.html'
      })
      .when('/isolate',
      {
          controller: 'mainController',
          templateUrl: 'partial/isolate.html'
      })
      .when('/cart',
      {
          controller: 'mainController',
          templateUrl: 'partial/full-cart.html'
      })
      .when('/progress',
      {
          controller: 'mainController',
          templateUrl: 'partial/progress-bar.html'
      })
      .otherwise({
          redirectTo: '/'
      })
    });

  routerApp.run(function($rootScope, $timeout, blockUI, cfpLoadingBar, pageService){
    $rootScope.start = function() {
      cfpLoadingBar.start();
    };

    $rootScope.complete = function () {
      cfpLoadingBar.complete();
    }

    // fake the initial load
    $rootScope.start();
    $rootScope.fakeIntro = true;
    $timeout(function() {
      $rootScope.complete();
      $rootScope.fakeIntro = false;
    }, 750);


    // fake the initial load
    var myBlockUI = blockUI.instances.get('navbar-load');
    myBlockUI.start();
    $rootScope.fakeIntroBU = true;
    $timeout(function() {
       myBlockUI.stop();
     $rootScope.fakeIntroBU = false;
      }, 5750);

  });