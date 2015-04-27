'use strict';

angular.module('poseidon')
.factory('Test', function($rootScope, $firebaseObject, $firebaseArray, $window) {
	var fbUser;
	var afUser;

	function Test() {
	}

	Test.init =  function() {
		fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
		afUser = $firebaseObject(fbUser);
		return afUser;
	};

	Test.add = function(name) {
		// console.log('inside test.js and the name is', name);
		// console.log('the afUser is', afUser);
		var names = afUser.names ? afUser.names.split(',') : [];
		names.push(name);
		afUser.names = names.join(',');
		return afUser.$save();
	};

	return Test;

});
