
var routerApp = angular.module('routerApp', 
	[
  'Tabletop',
	'ngResource', 
	'ngRoute',
  'ngCookies',
  'Gdoc',
  'pageService'
	]);

routerApp
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