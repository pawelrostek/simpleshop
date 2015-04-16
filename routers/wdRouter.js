
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
            'ui-notification',
//            'ui.router',
            //  'angular-growl',
              'ngSanitize',
            'ngAnimate'
        ]);

routerApp

        .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
                $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://script.googleusercontent.com**', 'http://drive.google.com/**', 'https://docs.google.com/**']);
            }])

// Progress bar site load
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
//                cfpLoadingBarProvider.includeSpinner = false;
                cfpLoadingBarProvider.latencyThreshold = 50;
            }])

// Block Ui load element
        .config(function (blockUIConfig) {
            blockUIConfig.delay = 100;
        })
        
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


// Router provider
        .config(function ($routeProvider) {
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
                                controller: 'uiController',
                                templateUrl: 'partial/ui-bootstrap.html'
                            })
                    .when('/notifications',
                            {
                                controller: 'notifyController',
                                templateUrl: 'partial/notifications.html'
                            })
                    .when('/super-effects',
                            {
                                controller: 'startController',
                                templateUrl: 'partial/super-effects.html'
                            })
                    .otherwise({
                        redirectTo: '/'
                    })
        });
        
        
//      Router UI - State
//        .config(function ($stateProvider, $urlRouterProvider) {
//
//            $urlRouterProvider.otherwise('/start');
//
//            $stateProvider
//
//                    .state('super-effects', {
//                        url: "/super-effects",
//                        templateUrl: "partial/super-effects.html",
//                        controller: "startController"
//                    })
//                    .state('start', {
//                        url: '/start',
//                        views: {
//                            '': {
//                                templateUrl: 'partial/start.html',
//                                controller: 'startController'
//                            },
////                            'vw-about': {
////                                templateUrl: 'partial/start.html',
////                                controller: 'startController'
////                            }
//                        }
//                    });
//
//        });

routerApp.run(function ($rootScope, $timeout, blockUI, cfpLoadingBar, $splash, wdPageService, Notification) {

    wdPageService.setSiteName("Główna");
    wdPageService.setSiteDescription("Opis strony głównej");
    $rootScope.show_only_content = false;

    // Magic Splash
    $rootScope.openSplash = function () {
        $splash.open({
            title: 'Hi there!',
            message: "This sure is a fine modal, isn't it?"
        });
    };

    //Load bar
    $rootScope.start = function () {
        cfpLoadingBar.start();
    };
    $rootScope.complete = function () {
        cfpLoadingBar.complete();
    }

    // fake the initial load
    $rootScope.start();
    $rootScope.fakeIntro = true;
    $timeout(function () {
        $rootScope.complete();
        $rootScope.fakeIntro = false;
    }, 750);


    // fake the initial load
    var myBlockUI = blockUI.instances.get('navbar-load');
    myBlockUI.start();
    $rootScope.fakeIntroBU = true;
    $timeout(function () {
        myBlockUI.stop();
        $rootScope.fakeIntroBU = false;
    }, 5750);



    $rootScope.primary = function () {
        Notification('Primary notification');
    };
    $rootScope.error = function () {
        Notification.error('Error notification');
    };
    $rootScope.success = function () {
        Notification.success('Success notification');
    };
    $rootScope.info = function () {
        Notification.info('Information notification');
    };
    $rootScope.warning = function () {
        Notification.warning('Warning notification');
    };
    $rootScope.primaryTitle = function () {
        Notification({message: 'Primary notification', title: 'Primary notification'});
    };
    $rootScope.errorTime = function () {
        Notification.error({message: 'Error notification 1s', delay: 1000});
    };
    $rootScope.successTime = function () {
        Notification.success({message: 'Success notification 20s', delay: 20000});
    };
    $rootScope.errorHtml = function () {
        Notification.error({message: '<b>Error</b> <s>notification</s>', title: '<i>Html</i> <u>message</u>'});
    };
    $rootScope.successHtml = function () {
        Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: 'Html content'});
    };


});