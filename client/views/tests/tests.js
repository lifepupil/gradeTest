'use strict';

angular.module('poseidon')
.controller('TestsCtrl', function($scope, Test) {
	var afUser = Test.init();
	console.log('in tests the afUser is', afUser);

	$scope.addClass = function(name) {
		console.log('using Test to add name', name);
		Test.add(name);
	};

});
