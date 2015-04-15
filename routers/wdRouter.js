
var routerApp = angular.module('routerApp', 
	[
            'Tabletop',
            'ngResource', 
            'ngRoute',
            'ngCookies',
            'angular-loading-bar', 
            'blockUI',

            'ng-isotope',
            'ui.bootstrap',

            'wdGdoc',
            'wdPageService',
            'wdSplash',

              'cgNotify',
            //  'angular-growl',
            //  'ngSanitize',
              'ngAnimate'
	]);

routerApp

  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://script.googleusercontent.com**', 'http://drive.google.com/**', 'https://docs.google.com/**']);
     }])

//Notification Growl
//  .config(['growlProvider', function(growlProvider) {
//      growlProvider.onlyUniqueMessages(false);
//      growlProvider.globalTimeToLive(15000);
//      growlProvider.globalEnableHtml(true);
//  }])
//  // .config(["growlProvider", "$httpProvider", function(growlProvider, $httpProvider) {
//  //     growlProvider.messagesKey("my-messages");
//  //     growlProvider.messageTextKey("messagetext");
//  //     growlProvider.messageSeverityKey("severity-level");
//  //     $httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);
//  // }])


// Progress bar site load
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
//    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 50;
  }])

 // Block Ui load element
  .config(function(blockUIConfig) {
//    blockUIConfig.message = 'Please stop clicking!';
    blockUIConfig.delay = 100;
})

// Router provider
  .config(function($routeProvider) {
      $routeProvider
      .when('/',
      {
          controller: 'startController',
          templateUrl: 'partial/start.html'
      })
      .when('/isotope',
      {
          controller: 'startController',
          templateUrl: 'partial/isotope.html'
      })
      .when('/cart',
      {
          controller: 'startController',
          templateUrl: 'partial/cart-summary.html'
      })
      .when('/progress',
      {
          controller: 'startController',
          templateUrl: 'partial/progress-bar.html'
      })
      .when('/uibootstrap',
      {
          controller: 'startController',
          templateUrl: 'partial/ui-bootstrap.html'
      })
      .when('/notifications',
      {
          controller: 'startController',
          templateUrl: 'partial/notifications.html'
      })
      .otherwise({
          redirectTo: '/'
      })
    });

  routerApp.run(function($rootScope, $timeout, blockUI, cfpLoadingBar, $splash, wdPageService){
    
    wdPageService.setSiteName("Główna");
    wdPageService.setSiteDescription("Opis strony głównej");
    
      // Magic Splash
    $rootScope.openSplash = function () {
      $splash.open({
        title: 'Hi there!',
        message: "This sure is a fine modal, isn't it?"
      });
    };
    
    //Load bar
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