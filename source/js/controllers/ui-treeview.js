App.controller('UiTreeviewController', function ($scope, $routeParams,$http,uitressview){
    

    
      $scope.setLevelPopup = function(tree,availableChild){
        console.log("ok");
        console.log(tree);
        console.log(availableChild);
        console.log($scope.allDepartment);
        $scope.department = angular.copy(tree);
        $scope.departmentId = tree.department.id;
        $scope.roleLevel = {};
        $scope.roleLevel.id = tree.id;
        $scope.roleLevel.currentRole = tree.role.id;
        $scope.roleList = [];
        $scope.roleLevel.newChild = 0;  
        $scope.roleLevel.editOrSave = false;

          angular.forEach($scope.allPermissions, function(value, key) {
                value.isSelected = false;
          });
        angular.forEach($scope.allPermissions, function(value, key) {
                angular.forEach(tree.menu, function(value1, key1) {
                    if(value1.menu.id == value.id){
                        value.isSelected = true;

                    }
                });
        });

        $('#editTab').click();
        angular.forEach($scope.roleType, function(value, key) {
              value.isAvailable = false;
              value.isAvailableChild = false;
          }); 
     
        angular.forEach($scope.roleType, function(value, key) {
            angular.forEach($scope.allDepartment, function(value1, key1) {
               if($scope.departmentId == value1.id){
                   angular.forEach(value1.useChildId, function(value2, key2) {
                    if(value.id == value2){
                      value.isAvailableChild = true;
                      
                   }
                });
               }                           
             });   
            angular.forEach(tree.childs, function(value1, key1) {
                if(value1.role.id == value.id){
                    value.isAvailable = true;
                    
                }
            });
             /*if(tree.role.id == value.id){
               value.isAvailable = true;
             }  */  

       }); 
        
      

        console.log($scope.roleType);
        $('#setLevelPopup').modal('show');
  };


  $scope.deleteThisRole = function(id, typeNode){
    console.log(id);
    console.log($scope.departmentId );
     uitressview.deleteRole(id,$scope.departmentId,typeNode).then(function(data){
         console.log("deleteeeee");
         $('#setLevelPopup').modal('hide');
         $scope.dep();
         
     });
  };
  
   uitressview.getAllRole().then(function(data){
         console.log(data);
         $scope.roleType = data;
         
   });

   uitressview.getAllPermissions().then(function(data){
         console.log(data);
         console.log("permisss...");
         $scope.allPermissions = data;
         angular.forEach($scope.allPermissions, function(value, key) {
            value.isSelected = false;
         });
         
   });


    uitressview.getAllDepartment().then(function(data){
      console.log(data);
     
      $scope.allDepartment = data;
   });  
  
  $scope.dep = function(){
        uitressview.getAllDepartment().then(function(data){
      console.log(data);
      console.log("000000");
      $scope.allDepartment = data;
   });  
  };
 

    $scope.family_treeview_tab = function(){
        //BEGIN FAMILY TREEVIEW VERTICAL
        //$('.family-tree-vertical li').hide();
        $('.family-tree-vertical li:first').show();
        $('.family-tree-vertical li').on('click', function (e) {
            var children = $(this).find('> ul > li');
            if (children.is(":visible")) children.hide('fast');
            else children.show('fast');
            e.stopPropagation();
        });
        //END FAMILY TREEVIEW VERTICAL

        //BEGIN FAMILY TREEVIEW HORIZONTAL
        //$('.family-tree-horizontal li').hide();
        $('.family-tree-horizontal li:first').show();
        $('.family-tree-horizontal li').on('click', function (e) {
            var children = $(this).find('> ul > li');
            if (children.is(":visible")) children.hide('fast');
            else children.show('fast');
            e.stopPropagation();
        });


        //END FAMILY TREEVIEW HORIZONTAL
    };

        

   $scope.setAddFirstLevel = function(){
         $scope.roleLevel.departmentId = $scope.departmentId;
        console.log($scope.roleLevel);
   uitressview.saveFirstLevelNode($scope.roleLevel).then(function(response){
            $scope.dep();
            $('#addFirstNodePopup').modal('hide');
         });
        
   };

    $scope.setRoleLevel = function(){
        $scope.roleLevel.departmentId = $scope.departmentId;
        $scope.roleLevel.id = $scope.department.id;
        $scope.roleLevel.currentRole = parseInt($scope.roleLevel.currentRole);
        console.log($scope.roleList);
        console.log($scope.department);
        if($scope.roleLevel.editOrSave === true){
            $scope.roleLevel.currentRole = $scope.department.role.id;
        }
        $scope.roleLevel.newChild = $scope.roleList.toString();
        console.log($scope.roleLevel);
        console.log($scope.allDepartment);
        /*angular.forEach($scope.allDepartment, function(value, key) {
            if(value.id === $scope.departmentId){
                console.log(value);
            }
        });*/
        uitressview.saveRolesLevel($scope.roleLevel).then(function(response){
            $scope.dep();
            $('#setLevelPopup').modal('hide');
         });
    };

    $scope.addFirstNode = function(dept){
        
        console.log(dept);
        $scope.roleLevel = {};
        $('#addFirstNodePopup').modal('show');
        $scope.departmentId = dept.id;
        
    };
    $scope.roleList = [];
    $scope.selectRoleTypeFunction = function(role, value){
         console.log(role);
         console.log(value);
         if(value === true){
            $scope.roleList.push(role.id);   
         }else{
            $scope.deleteRoleFunction(role);
         }
         console.log($scope.roleList);
    };
    $scope.deleteRoleFunction = function(role){
           angular.forEach($scope.roleList, function(obj, index){
               if(obj == role.id){
                     $scope.roleList.splice(index, 1);
                    
               }
           });
    };

    /*$scope.selectedPermission = function(value, permissionsList){
        console.log(value);

        console.log(permissionsList);
        console.log($scope.allPermissions);
    };*/

    $scope.savePermission = function(){
        $scope.permissionObj = {};
        $scope.permissionObj.roleId =$scope.department.role.id;
        $scope.permissionObj.id = $scope.departmentId;
        $scope.permissionObj.menu = $scope.allPermissions;
        console.log($scope.allPermissions);
        console.log($scope.permissionObj);

         $http({method:'POST',url:'http://localhost:8080/savePemissions',data:$scope.permissionObj}).success(function(response) {
                $('#setLevelPopup').modal('hide');
                $scope.dep();
         });
        /* uitressview.savePemissions($scope.permissionObj).then(function(data){
                console.log(data);
                $scope.roleType = data;
         
        });*/

    };

   
});