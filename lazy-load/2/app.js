var app = angular.module("app", [
    "ui.router",
    "oc.lazyLoad"
]);

app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    //Redirect any unmatched url
    $urlRouterProvider.otherwise("/");
    
    //home
    $stateProvider.state('index', {
        url: "/",
        templateUrl: "template.html",
        controller: "AppCtrl as ctrl",
        resolve: {
            deps: function ($ocLazyLoad) {
                return $ocLazyLoad.load('ctrl.js');
            }
        }
    });

   $ocLazyLoadProvider.config({
      debug: true
    });

});