
var routerApp = angular.module('routerApp', 
	[
	'ngResource', 
	'ngRoute',
    'ngCookies'
	]);

routerApp

// .config(function($httpProvider) {
//         $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//         $httpProvider.defaults.useXDomain = true;
//         $httpProvider.defaults.withCredentials = true;
//         delete $httpProvider.defaults.headers.common["X-Requested-With"];
//         $httpProvider.defaults.headers.common["Accept"] = "application/json";
//         $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
//     })

.config(['$sceDelegateProvider', function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://script.googleusercontent.com**', 'http://drive.google.com/**', 'https://docs.google.com/**']);
     }])

.config(function($routeProvider) {
    $routeProvider
    .when('/',
    {
        controller: 'mainController',
        templateUrl: 'partial/main.html'
    })
    .otherwise({
        redirectTo: '/'
    })
  });
