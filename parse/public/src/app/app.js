var PARSE_APP_ID = 'gprSlTIj7xJnYyRbgzmKUwSyqL91TloH5W0MHRGR';
var PARSE_JAVASCRIPT_KEY = 'NbL7T1SwgJLlntQMCahzBL7XJuktYEzuCudKmWI2';

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

function trackEvent(name, options) {
  Parse.Analytics.track(name, options);
}

function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Moment Update
moment.locale('en', {
  calendar : {
    lastDay : '[Yesterday at] LT',
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    lastWeek : '[Last] dddd [at] LT',
    nextWeek : 'dddd [at] LT',
    sameElse : 'MMMM Do, YYYY'
  }
});

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

.controller( 'AppCtrl', function AppCtrl ( $rootScope, $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | MBooks' ;
    }
  });

  $rootScope.validateUser = function() {
    var user = Parse.User.current();
    if(!user || !user.authenticated()) 
      return false;

    return true;
  }

  $scope.navBarExpanded = false;
  
  $scope.toggleNavBarExpansion = function() {
    $scope.navBarExpanded = !$scope.navBarExpanded;
  }

  $scope.showLoginModal = function() {

  }

  $scope.showSignupModal = function() {
    
  }
})

;

