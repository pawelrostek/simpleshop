 
angular.module('routerApp')
	.controller('mainController', mainController);

function mainController($scope, $routeParams, $http, $timeout, Gdoc, pageService) {

  var page_name = pageService.setSiteName("Główna");
  var page_name = pageService.setSiteDescription("Opis strony głównej");

  Gdoc.query(function(data) {
      $scope.spreadsheet = data;
      $scope.site_name = page_name;
      reset_itemHeight();
    });

  // $scope.$watch('$viewContentLoaded', function(){
  $scope.$on('$routeChangeSuccess', function () {

      $timeout(function() {
        pageService.loadedPage(true);
      }, 1000);

  });
}



// Rezise element DIV
window.onresize = function() {
  reset_itemHeight();
}

function reset_itemHeight() {
  
  $('.items').each(function(){
      var highestBox = 0;
      $(this).find('.sampleCart_shelfItem').each(function(){
          if($(this).height() > highestBox){
            highestBox = $(this).height();
          }
      })
      $(this).find('.simpleCart_shelfItem').height(highestBox);
  });
}
