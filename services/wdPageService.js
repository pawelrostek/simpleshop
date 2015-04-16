
/**
 * 
 *      Autor: Power Web Design
 *      Module: wdPageService
 *      Version: 0.1
 *      
 */
angular.module('wdPageService', [])
        .factory('wdPageService', function ($rootScope) {
            return {
                renderOnlyContent: function (value) {
                    $rootScope.show_only_content = value;
                },
                setTitle: function (title) {
                    $rootScope.title = title;
                },
                setSiteName: function (site_name) {
                    $rootScope.site_name = site_name;
                },
                setSiteDescription: function (site_description) {
                    $rootScope.site_description = site_description;
                },
                loadedPage: function (value) {
                    $rootScope.loaded_page = value;
                }
            }
        })
        .value('version', '0.1');
