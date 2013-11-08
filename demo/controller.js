angular.module('myApp', [fl.wizard])

.controller('myWizardController', ['$scope', 'wizard', function($scope, wizard) {
    $scope.save = function() {
        console.log('model saved');
    };

    $scope.wizard = wizard.init({
        theme     : 1,
        demo      : 0,
        doc       : 0,
        community : 0
    }, $scope.save, true); // true for unrestricted navigation (can skip steps)

}]);
