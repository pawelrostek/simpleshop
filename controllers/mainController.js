 
angular.module('routerApp')
	.controller('mainController', mainController);

function mainController($scope, $routeParams, $http, $timeout, $resource) {

	var shoses = [
		{name: 'Nike Air Max Trainers UK S205G Black'}, 
		{name: 'Puma Trainers Max Air'}, 
		{name: 'Adidas Max Trainers R105W White'},
		{name: 'NewBalance R105W White Blue'},
		{name: 'Nike Max Trainers UK S205G Red'}, 
		{name: 'Puma Trainers Max Air'}, 
		{name: 'Adidas Trainers R105W White'}
	];

	$scope.items = shoses;

	var public_spreadsheet_url = 'https://spreadsheets.google.com/feeds/list/1enX_A-EJm7ey6v6C6SB9OERtgR1b5FzRjaRrj3XYOOk/od6/public/values?alt=json';


	$http.get(public_spreadsheet_url)
		.then(function(res){
			console.log(res.data);
				$scope.spreadsheet = res.data;
				$scope.display_sheet = $scope.spreadsheet.Sheet1;
				$scope.site_name = $scope.spreadsheet.Sheet1[0].site_name;
				$scope.page_title = $scope.spreadsheet.Sheet1[0].page_title;
				$scope.page_desctiption = $scope.spreadsheet.Sheet1[0].page_desctiption;
				$scope.site_email = $scope.spreadsheet.Sheet1[0].site_email;
				$scope.site_logo = $scope.spreadsheet.Sheet1[0].site_logo;
			}
		);



	var spreadsheet = '1enX_A-EJm7ey6v6C6SB9OERtgR1b5FzRjaRrj3XYOOk';

 // $http({
 //        url: 'https://spreadsheets.google.com/feeds/list/'+spreadsheet+'/od6/public/values?alt=json',
 //        method: "GET"
 //      }).then(function(response) {
 //          // success
 //          $scope.summary = response;
          
 //          console.log("summary found");
 //          console.log(response);
 //        }, 
 //        function(response) { // optional
 //          // failed
 //          console.log("spreadsheet not found.");
 //        }
 //      );

// $.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/0AtMEoZDi5-pedElCS1lrVnp0Yk1vbFdPaUlOc3F3a2c/od6/public/values?alt=json", function(data) {
//   //first row "title" column
//   console.log(data.feed.entry[0]['gsx$title']['$t']);
// });

	// $resource(public_spreadsheet_url,{}).get(function(data){
          
 //          $scope.posts = data.data.children;
 //          $scope.displayedCollection = [].concat($scope.posts);
 //        });


    // Tabletop.init({ key: public_spreadsheet_url,
    //       callback: createStore,
    //     wanted: [sheet],
    //       simpleSheet: true
    // });

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

}
