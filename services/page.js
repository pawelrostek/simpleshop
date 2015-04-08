angular.module('pageService', [])
  .factory('pageService', function($rootScope){
    return {
        setTitle: function(title){
            $rootScope.title = title;
        }
    }
})
.value('version', '0.1');
