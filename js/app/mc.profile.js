angular.module('mc')
    .service('ProfileModel', ['socket', 'toaster', function(socket, toaster) {
        this.createProfile = function(profile, callback) {
            socket.emit("createProfile", profile);
            socket.on("createProfile.success", function(profile) {
                socket.removeAllListeners("createProfile.success");
                toaster.pop('success', "Info", "Profile created for " + profile.name);
                callback(profile);
            });
        };
        this.getAllProfiles = function(callback) {
            socket.emit("getAllProfiles");
            socket.on("getAllProfiles.success", function(profiles) {
                callback(profiles);
            });
        }
    }])
    .controller('ProfileController', ['$scope', 'ProfileModel', '$state', function($scope, ProfileModel, $state) {
        $scope.createProfile = function() {
            ProfileModel.createProfile($scope.profile, function(profile) {
                $scope.onInit();
                $scope.profile = profile;
                $scope.$apply();
                $state.go("profile.home", {
                    profileId: profile.name
                });
            });
        };
        $scope.selectProfile = function() {
            $state.go("profile.home", {
                profileId: $scope.profile.name
            });
        };
        $scope.onInit = function() {
            ProfileModel.getAllProfiles(function(profiles) {
                $scope.profiles = profiles;
                $scope.$apply();
            });
        };

    }])
    .controller('IndexController', ['$scope', 'ProfileModel', '$state', function($scope, ProfileModel, $state) {
        $scope.onInit = function() {
            ProfileModel.getAllProfiles(function(profiles) {
                var result = profiles.filter(
                    function(value) {
                        return (value.name === $state.params.profileId);
                    }
                );
                if(result.length == 0){
                	$state.go("profile");
                }
            });
        };
    }])
    .controller('HomeController', ['$scope', 'ProfileModel', '$state', function($scope, ProfileModel, $state) {
        $scope.onInit = function() {
            
        };
    }])
    .controller('FDController', ['$scope', 'ProfileModel', '$state', function($scope, ProfileModel, $state) {
        $scope.onInit = function() {
            
        };
    }]);