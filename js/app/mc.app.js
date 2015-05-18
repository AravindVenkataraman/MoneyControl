var mcApp = angular.module('mc', ['ui.router', 'ui.bootstrap','toaster'])
.value('socket', io.connect('http://localhost:10'))
.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
$stateProvider
            .state("profile-selection", {
                url: '/profile',
                templateUrl: 'html/profile-selection.html',
                controller: 'ProfileController'
            })
            .state("profile", {
                url: '/profile/{profileId}',
                templateUrl: 'html/profile-index.html',
                controller: 'IndexController'
            })
            .state("profile.home", {
                url: '/home',
                templateUrl: 'html/profile-home.html',
                controller: 'HomeController'
            })
            .state("profile.fd", {
                url: '/fd',
                templateUrl: 'html/fd-list.html',
                controller: 'FDController'
            });
            $urlRouterProvider.otherwise('/profile');
	}])
.run(['$state', '$rootScope','$timeout','ProfileModel', function($state, $rootScope,$timeout,ProfileModel) {
	
}]);