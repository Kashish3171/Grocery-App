var app=angular.module('grocerylist',["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : "views/first.html",
			controller:"homecontroller"
		})
		.when('/second',{
			templateUrl:"views/second.html",
			controller:"grocerylistitems"
		})
		.when('/second/edit/:id/',{
			templateUrl:"views/second.html",
			controller:"grocerylistitems"
		})
		.otherwise({
			redirectTo:"/"
		})
});



app.service("groceryservice",function($http){
	var groceryservice={};var alpha = 'not';
	groceryservice.grocerylist = [];
		$http({
			method:'GET',
			url:'server_data.json'
		}).then(function successCallback(response)
		{ 	console.log(response.data);
			groceryservice.grocerylist=response.data;
			//console.log(data);
		},function errorCallback(response){
			console.log(response);
		});
groceryservice.save =function(entry){
	var updated =groceryservice.searchid(entry.id);
	//console.log($scope.updated!=groceryservice);
	if(updated)
	{
		
		updated.completed=entry.completed;
		updated.itemName=entry.itemName;
		updated.date=entry.date;
		
	}
	else
	{
       $http({
       	  method:'POST',
       	  url:'additem.json',
       	  params : entry
       }).then(function successCallback(response){
       		entry.id=response.newid;
       },
       function errorCallback(response){
 			console.log(response);
       });
  
	groceryservice.grocerylist.push(entry);
	
}
};
groceryservice.newId =function(){
	var id=groceryservice.grocerylist.length + 1;
	return id;
};
groceryservice.searchid=function(entry){
	for(var i=0;i<groceryservice.grocerylist.length;i++)
	{	//console.log('entry is identified');
		//console.log(entry);
		if(parseInt(entry)===groceryservice.grocerylist[i].id)
		{    console.log(" searched id is" + groceryservice.grocerylist[i].id);

			return groceryservice.grocerylist[i];
		}
		
	}

};
groceryservice.remove=function(entry)
{ 	console.log(entry.id);
	var index=groceryservice.grocerylist.indexOf(entry);
	console.log(index);
	groceryservice.grocerylist.splice(index,1);
}
groceryservice.mark=function(entry)
{
	entry.completed=!entry.completed;
}
return groceryservice;
});

app.controller('homecontroller',["$scope","groceryservice",function($scope,groceryservice){
$scope.groceryItems=groceryservice.grocerylist;
$scope.removeitem =function(entry)
{ console.log(entry);
	groceryservice.remove(entry);
}
$scope.mark=function(entry)
{
	groceryservice.mark(entry);
}

$scope.$watch( function(){return groceryservice.grocerylist;},function(){
	$scope.groceryItems=groceryservice.grocerylist;
});

}]);
app.controller('grocerylistitems',["$scope","$routeParams","$location","groceryservice",function($scope,$routeParams,$location,groceryservice){

$scope.groceryItems=groceryservice.grocerylist;

if(!$routeParams.id){

$scope.groceryl={id:'alpha',completed:false,itemName:'aloo',date:new Date()};
}else
{ 
	$scope.groceryl =angular.copy(groceryservice.searchid($routeParams.id));
}


$scope.save = function(){

	groceryservice.save($scope.groceryl);
	
	
		
	//console.log($scope.groceryl.id);	
	$location.path('/');
}


}]);

app.directive('kfdir',function(){
	return {
		restrict : 'E',
		templateUrl:'views/partitem.html'
	}
});