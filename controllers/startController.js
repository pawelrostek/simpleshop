
/**
 * 
 *      Start Controller
 * 
 */
angular.module('routerApp')
        .controller('startController', startController);

function startController($scope, $timeout, wdGdoc, $modal, wdPageService, notify) {

    wdGdoc.query(function (data) {
        $scope.spreadsheet = data;
        reset_itemHeight();
    });

    // $scope.$watch('$viewContentLoaded', function(){
    $scope.$on('$routeChangeSuccess', function () {

        $timeout(function () {
            wdPageService.loadedPage(true);
        }, 1000);

    });
}


// Rezise element DIV
window.onresize = function () {
    reset_itemHeight();
}

function reset_itemHeight() {

    $('.items').each(function () {
        var highestBox = 0;
        $(this).find('.sampleCart_shelfItem').each(function () {
            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        })
        $(this).find('.simpleCart_shelfItem').height(highestBox);
    });
}
