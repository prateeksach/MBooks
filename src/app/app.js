angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ui.bootstrap',
  'ngBoilerplate.home',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | MBooks' ;
    }
  });

  $scope.navBarExpanded = false;
  
  $scope.toggleNavBarExpansion = function() {
    $scope.navBarExpanded = !$scope.navBarExpanded;
  }

  $scope.showContactModal = function() {

  }

  $scope.showLoginModal = function() {

  }

  $scope.showSignupModal = function() {
    
  }
})

;

