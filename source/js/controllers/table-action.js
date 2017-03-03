App.controller('TableActionController', function($scope, $routeParams, $http,tableactionservice){
    $scope.table_action_update = function(){
        $(".spinner").spinner();
        $.fn.Data.checkbox();

        //BEGIN CHECKBOX TABLE
        $('.checkall').on('ifChecked ifUnchecked', function(event) {
            if (event.type == 'ifChecked') {
                $(this).closest('table').find('input[type=checkbox]').iCheck('check');
            } else {
                $(this).closest('table').find('input[type=checkbox]').iCheck('uncheck');
            }
        });
        //END CHECKBOX TABLE
    };
    $scope.saveUserProfile = function(){
        console.log("ok");
        console.log($scope.userProfile);
        tableactionservice.saveUserProfile($scope.userProfile).then(function(response){
            
         });

    };

    tableactionservice.getUserProfile().then(function(data){
            $scope.userProfileData=data;
         });
   

    $scope.editUserProfile=function(user){
        $scope.userProfile=user;
        $('#userId').click();
    };

});