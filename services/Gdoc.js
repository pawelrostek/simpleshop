angular.module('Gdoc', [])
.factory('Gdoc', ['$rootScope', function($rootScope) {
    
    return {
      query: function(callback) {
        Tabletop.init({
          key: '1enX_A-EJm7ey6v6C6SB9OERtgR1b5FzRjaRrj3XYOOk',
          simpleSheet: true,
          callback: function(data, tabletop) {
            if(callback && typeof(callback) === "function") {
              $rootScope.$apply(function() {
                callback(data);
              });
            }
          }
        });
      }
    }
  }]);