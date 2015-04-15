
/**
 * 
 *      Autor: Power Web Design
 *      Module: wdGdoc
 *      Version: 0.1
 *      
 */
angular.module('wdGdoc', [])
        .factory('wdGdoc', ['$rootScope', function ($rootScope) {

                return {
                    query: function (callback) {
                        Tabletop.init({
                            key: '1enX_A-EJm7ey6v6C6SB9OERtgR1b5FzRjaRrj3XYOOk',
                            simpleSheet: true,
                            callback: function (data, tabletop) {
                                if (callback && typeof (callback) === "function") {
                                    $rootScope.$apply(function () {
                                        callback(data);
                                    });
                                }
                            }
                        });
                    }
                }
            }])
        .value('version', '0.1');