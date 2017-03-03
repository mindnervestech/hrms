
App.service('uitressview', function($http,$q){

	
	this.getAllRole=function(){
		var defer = $q.defer();

		$http({method:'GET',url:'http://localhost:8080/getAllRole'}).success(function(data) {
      		defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};

	this.getAllDepartment=function(){
		var defer = $q.defer();
		$http({method:'GET',url:'http://localhost:8080/getAllDepartment'})
		.success(function(data) {
      		defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};

	this.deleteRole=function(id,departmentId){
		var defer = $q.defer();

		$http({method:'GET',url:'http://localhost:8080/deleteRole',params:{id:id,departmentId:departmentId,typeNode:typeNode}}).success(function(data) {
      		defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};
	

	this.getAllPermissions=function(){
		var defer = $q.defer();

		$http({method:'GET',url:'http://localhost:8080/getAllPermissions'}).success(function(data) {
      		defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};

	this.savePemissions=function(permissionObj){
		var defer = $q.defer();
		 $http({method:'POST',url:'http://localhost:8080/savePemissions',data:permissionObj}).success(function(response) {
            defer.resolve(response);
         }).error(function(error){
			defer.reject(error);
		});
	};	
	
	this.saveRolesLevel=function(roleLevel){
		var defer = $q.defer();
		$http({method:'POST',url:'http://localhost:8080/saveRolesLevel',data:roleLevel})
		.success(function(data) {      		
			defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};
	
	this.saveFirstLevelNode=function(roleLevel){
		var defer = $q.defer();
		$http({method:'POST',url:'http://localhost:8080/saveFirstLevelNode',data:roleLevel})
		.success(function(data) {      		
			defer.resolve(data);
   		}).error(function(error){
			defer.reject(error);
		});

		return defer.promise;
	};


});
