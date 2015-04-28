'use strict';

angular.module('poseidon')
.factory('Test', function($rootScope, $firebaseObject, $firebaseArray) {
	var fbUser;
	var afUser;

	function Test() {
	}

	Test.init =  function() {
		fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
		afUser = $firebaseObject(fbUser);
		return afUser;
	};


	Test.editTest = function(test) {

	};

	Test.deleteTest = function(test, index) {
		console.log('INSIDE Test - test', test, 'index', index);
		// DOING $remove WILL NOT REMOVE FROM FIREBASE
		// SO WE NEED TO FIND WHERE TO POINT ON FIREBASE
		var fbTests = fbUser.child('tests/' + test.className);
		var afTests = $firebaseArray(fbTests);
		// console.log(afTests);
		afTests.$loaded().then(function() {
			// console.log(afTransactions);
			var foundTest = afTests[index];
			afTests.$remove(foundTest);
		});

	};


	Test.addTest = function(test) {
		var tempTest = angular.copy(test);
		tempTest.date = tempTest.date.getTime();


		var fbTests = fbUser.child('tests/' + tempTest.className);
		// console.log(test.className, fbTests);
		var afTests = $firebaseArray(fbTests);
		afTests.$add(tempTest);
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
