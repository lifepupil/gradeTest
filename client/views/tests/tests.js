'use strict';

angular.module('poseidon')
.controller('TestsCtrl', function($scope, Test) {
	var afUser = $scope.afUser = Test.init();
	afUser.$loaded().then(syncNames);
	// console.log('in tests the afUser is', afUser);


	$scope.editTest = function(test) {
		// console.log('test', test, 'index', index);
		var tempTest = angular.copy(test);
		tempTest.date = new Date(test.date);
		$scope.test = tempTest;
	};

	$scope.deleteTest = function(test, index) {
		// console.log('test', test, 'index', index);
		Test.deleteTest(test, index);
	};


	$scope.addTest = function(test) {
		Test.addTest(test);
	};

	$scope.addClass = function(name) {
		// console.log('using Test to add name', name);
		Test.add(name).then(syncNames);
		$scope.className = '';
	};

	function syncNames() {
		$scope.names = afUser.names ? afUser.names.split(',') : [];
	}
});
