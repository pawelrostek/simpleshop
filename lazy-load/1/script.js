var $appControllerProvider; //see below

var app = angular.module('myApp', []);

app.config(function($controllerProvider) {
  $appControllerProvider = $controllerProvider; //cache this so that we can lazy load controllers
});

app.controller('myCtrl', function($scope) {
  $scope.sections = ['top','mid','bottom']; //html files to load (top.html, etc)
  $scope.loadedSections = [$scope.sections[0]]; //loaded html files
});

app.directive('scrollLoad', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var to = scope[attrs.scrollLoadTo]; //$scope.loadedSections
      var from = scope[attrs.scrollLoadFrom]; //$scope.sections

      $window = angular.element(window);
      $window.bind('scroll', function(event) {
        var scrollPos = document.body.scrollTop + document.documentElement.clientHeight;
        var elemBottom = element[0].offsetTop + element.height();
        if (scrollPos >= elemBottom) { //scrolled to bottom of scrollLoad element
          $window.unbind(event); //this listener is no longer needed.
          if (to.length < from.length) { //if there are still elements to load
            //use $apply because we're in the window event context
            scope.$apply(to.push(from[to.length])); //add next section
          }
        }
      });
    }
  };
});

app.factory('myService', function($http, $q) {
  return {
    getController: function(fileName) {
      var deferred = $q.defer();
      
      $http.get(fileName+'.js').then(function(response) {
        deferred.resolve(response.data);
      });
      
      return deferred.promise;
    }
  }
});

app.directive('lazy', function(myService, $compile, $q) {
  /* I store the directive in a variable then return it later
   * so that I can abstract directive logic into other functions below */
  var directiveReturn = {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var loadName = scope.$eval(attrs.lazy);
     
      //this is straightforward - see the "addScript" function for explanation
      myService.getController(loadName).then(function(js) {
        return addScript(loadName, js, scope);
      }).then(function() {
        //the controller has been lazy loaded into angular
        //now use "ng-include" to lazy load the view.
        var ngInc = angular.element('<span></span>')
          .attr('ng-include', "'"+loadName+".html'")
          .attr('ng-controller', loadName+'Ctrl');
          element.append(ngInc);
          $compile(ngInc)(scope);
      });
    } //link
  }; //directive return

  /*
   * This is the magic.
   */
  var scriptPromises = {};
  function addScript(loadName, js, scope) {
    if (!scriptPromises[loadName]) { //if this controller hasn't already been loaded
      var deferred = $q.defer();
      //cache promise (which caches the controller when resolved)
      scriptPromises[loadName] = deferred.promise;
      
      //inject controller into a script tag
      var script = document.createElement('script');
      script.src = 'data:text/javascript,' + encodeURI(js);
      script.onload = function() {
        //this is how you lazy load a controller
        $appControllerProvider.register(loadName, window[loadName+'Ctrl']);
        //now that the controller is registered with angular, resolve the promise
        //then, it is safe to add markup that uses this controller with ng-controller
        scope.$apply(deferred.resolve());
      };
      //when this script loads, the controller will be registered and promise is resolved
      document.body.appendChild(script);
      return deferred.promise;
    }
    else { //controller already loaded
      return scriptPromises[loadName]; //use cached controller
    }
  }
  return directiveReturn;
});