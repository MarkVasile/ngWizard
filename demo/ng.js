
angular.module('myApp.controllers', [])
.controller('myWizardController', ['$scope', 'wizard', function($scope, wizard) {

    $scope.themes = ['Walk in a park', 'Sprint', 'Marathon', 'Parcour'];

    $scope.save_counter = 0;

    $scope.save = function(steps, err) {
	$scope.savedModel = angular.copy($scope.myDemo);
	$scope.save_counter++;
    };

$scope.modelDirty = function() {
	return !angular.equals($scope.savedModel, $scope.myDemo);
}

    $scope.wizard = wizard.init({
        theme     : 1,
        demo      : 0,
        doc       : 0,
        community : 0
    }, $scope.save); // you can add true as third param to get unrestricted navigation

}]);


angular.module('myApp', ['myApp.controllers', 'fl.wizard']);
