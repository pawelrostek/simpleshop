angular.module('routerApp')
        .directive('wdRenderElement', function () {
            console.log("Wd Render Element - directives");

            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    if (scope.show_only_content)
                        element.remove();
                }
            };

        });