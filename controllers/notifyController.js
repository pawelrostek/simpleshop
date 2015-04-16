
/**
 * 
 *      Notify Controller
 * 
 */
angular.module('routerApp')
        .controller('notifyController', notifyController);

function notifyController($scope, $timeout, wdPageService, notify) {

    wdPageService.renderOnlyContent(true);

    $timeout(function () {
        wdPageService.loadedPage(true);

    }, 1000);

    // Notify
    $scope.myNotify = function (message) {

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