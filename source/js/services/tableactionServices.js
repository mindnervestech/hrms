
App.service('tableactionservice', function($http,$q){

	
	this.getUserProfile=function(){
		var defer = $q.defer();

		$http({method:'GET',url:'http://localhost:8080/getUserProfile'})
		.success(function(data) {
      		defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};
	
	this.saveUserProfile=function(userProfile){
		var defer = $q.defer();
		$http({method:'POST',url:'http://localhost:8080/saveUserProfile',data:userProfile})
		.success(function(data) {      		
			defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};
	
});
