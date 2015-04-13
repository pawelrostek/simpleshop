angular.module('routerApp')
  .directive('lazy', function($timeout) {
    console.log("Lazy load");
    return {
      restrict: 'C',
      link: function (scope, elm) {
        $timeout(function() {
          $(elm).lazyload({
            effect: 'fadeIn',
            effectspeed: 2500,
            'skip_invisible': false
          });
        }, 0);
      }
    };
  });