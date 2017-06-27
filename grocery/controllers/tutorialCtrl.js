angular.module('tutorialCtrlModule',[])

.controller("TutorialCtrl",["$scope","calculations",function($scope,calculations){

	$scope.tutobj={};
	$scope.tutobj.nae="kashish";
	$scope.tutobj.bindOutput=2;
	$scope.timesTwo=function(){
		$scope.tutobj.bindOutput=calculations.timesTwo($scope.tutobj.bindOutput);
	}
}])

.directive("welcomeMessage",function(){
	return {
		restrict :'E',
		template : '<div>How are you mr directive</div>'
	}
})

.service('calculations',function(){
	var calculation={};
	calculation.timesTwo=function(a){
		return a*2;
	};
	console.log(calculation.timesTwo);
	return calculation;
})
.controller("TutorialCtrl2",["$scope",function($scope){
	$scope.secondTutorial="this is secondTutorial";
}]);



