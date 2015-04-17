// Define the Account Page module
angular.module( 'ngBoilerplate.account', [
  'ui.router',
  'ui.bootstrap',
  'parse-angular',
  "ngAnimate"
])

// Configuration of the URL
.config(function config( $stateProvider ) {
  $stateProvider.state( 'account', {
    url: '/account',
    views: {
      "main": {
        controller: 'AccountCtrl',
        templateUrl: 'account/account.tpl.html'
      }
    },
    data:{ pageTitle: 'My Account' }
  });
})

// Account page controller
.controller( 'AccountCtrl', function HomeController( $scope, $rootScope ) {

})

;