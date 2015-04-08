
  angular.module('redditApi', ['ngResource'])
  .factory('redditModel', function($resource){

    var services = {};

    services.categorys = ['cats', 'pics', 'funny', 'gaming', 'AdviceAnimals', 'aww'];

    //RES
    services.getResource = function(category, limit){
      var url = 'http://www.reddit.com/r/' + category + '.json?limit=' + limit;
      return $resource(url,{});
    }

    services.getRandomSubreddit = function(rsub) {
      var sub = services.categorys[Math.floor(Math.random() * services.categorys.length)];
      if (sub == rsub) {
        return services.getRandomSubreddit(rsub);
      }
      return sub;
    }

    return services;
  })
  .value('version', '0.1');
