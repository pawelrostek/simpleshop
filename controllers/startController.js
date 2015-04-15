
/**
 * 
 *      Start Controller
 * 
 */
angular.module('routerApp')
	.controller('startController', startController);

function startController($scope, $routeParams, $http, $timeout, wdGdoc, $modal, wdPageService, notify) {

  wdGdoc.query(function(data) {
      $scope.spreadsheet = data;
      reset_itemHeight();
    });

  // $scope.$watch('$viewContentLoaded', function(){
  $scope.$on('$routeChangeSuccess', function () {
      
      $('#cartPopover').hide();
      $timeout(function() {
        wdPageService.loadedPage(true);
      }, 1000);

  });


  // Ui Bootstrap alerts template
  $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };


  // Ui Bootstrap slider
  $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }


  // Ui Bootstrap modal
 $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      // controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };


  // Notify
 $scope.myNotify = function(message){

   $scope.msg = 'Hello! This is a sample message!';
   $scope.template = '';

   $scope.positions = ['right', 'center', 'left'];
   $scope.position = $scope.positions[0];

   $scope.duration = 3000;

   notify({
           message: message,
           classes: $scope.classes,
           templateUrl: $scope.template,
           position: $scope.position,
           duration: $scope.duration
       });
 };




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
