// Define the About Page module
angular.module( 'ngBoilerplate.about', [
  'ui.router',
  'ui.bootstrap',
  "ngAnimate"
])

// Configuration of the URL
.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'About Us' }
  });
})

// About page controller
.controller( 'AboutCtrl', function HomeController( $scope, $rootScope ) {

})

;