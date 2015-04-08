var ngApp = angular.module('ngApp',['ngResource', 'ngRoute']);

ngApp
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://script.googleusercontent.com**', 'http://drive.google.com/**']);
     }])

.config(function($routeProvider) {
    $routeProvider
    .when('/',
    {
        controller: 'main',
        templateUrl: 'items.html'
    })
    .otherwise({
        redirectTo: '/'
    })
  });
 

ngApp.controller('main', function($scope, $routeParams, $http, $timeout){
    Tabletop.init({ key: public_spreadsheet_url,
          callback: createStore,
        wanted: [sheet],
          simpleSheet: true
    });

    function createStore (data,tabletop) {
    $timeout(function() {
      $scope.items = data;
      $scope.sitename = data[0].sitename;
      $scope.pagetitle =  data[0].pagetitle;
      $scope.pagedescription = data[0].pagedescription;
      $scope.siteemail = data[0].siteemail;
      $scope.paypalemail = data[0].paypalemail;
      $scope.sitelogo = data[0].sitelogo;
      $scope.paypal_email = data[0].paypalemail;
    

      $timeout(function() {
        $('.loading').hide(); // hide spinner
            $("#content").gridalicious({
                  width: 250,
              animate: true,
              animationOptions: {
                queue: true,
                speed: 50,
                duration: 100,
                effect: 'fadeInOnAppear'
              }
              });

      }, 400);
      
        console.log("Loading simplecart");
        simpleCart({
          cartColumns: [
                { attr: "name", label: "Name"},
                { view: "currency", attr: "price", label: "Price"},
                { view: "decrement", label: false},
                { attr: "quantity", label: "Qty"},
                { view: "increment", label: false},
                { view: "currency", attr: "total", label: "SubTotal" },
                { view: "remove", text: "Remove", label: false}
            ],
          cartStyle: "table", 
              checkout: {
                    type: "PayPal",
                  email: $scope.paypal_email
              }
          });
          
    }, 400);
  }
});

