// Parse Keys and Initialization
var PARSE_APP_ID = 'gprSlTIj7xJnYyRbgzmKUwSyqL91TloH5W0MHRGR';
var PARSE_JAVASCRIPT_KEY = 'NbL7T1SwgJLlntQMCahzBL7XJuktYEzuCudKmWI2';

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

// Universal Functions
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

// Define main app module
angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ui.bootstrap',
  'ngBoilerplate.home',
  'ui.router'
])

// Define default URL
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

// Main app initialization
.run( function run () {

})

// Super controller
.controller( 'AppCtrl', function AppCtrl ( $rootScope, $scope, $location, $timeout ) {
  // Variable for controlling body scroll when modal is open
  $rootScope.bodyScroll = true;

  // Set rootScope variable for showing modal
  $rootScope.showModal = false;

  // Set page title whenever the URL changes
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | MBooks' ;
    }
  });

  // Check if a user is logged in
  $rootScope.validateUser = function() {
    var user = Parse.User.current();
    if(!user || !user.authenticated()) 
      return false;

    return true;
  }

  // Nav bar collapsing for responsive usage
  $scope.navBarExpanded = false;
  $scope.toggleNavBarExpansion = function() {
    $scope.navBarExpanded = !$scope.navBarExpanded;
  }

  // Variables for login and signup modals
  $scope.loginObj = {visible: false, email: "", password: "", isLoggingIn: false, loginError: "", timeout: null}
  $scope.signupObj = {visible: false, firstName: "", lastName: "", phone: "", email: "", password: "", confirm: "", isSigningUp: false, signupError: "", timeout: null}
  $scope.sellObj = {visible: false, isAdding: false, addingError: "", timeout: null}

  // Hide modal
  $scope.hideSuperModal = function() {
    $rootScope.showModal = false;
    $rootScope.bodyScroll = true;

    // Delay before resetting the modal variables to avoid glitches
    $timeout(function() {
      $scope.loginObj = {visible: false, email: "", password: "", isLoggingIn: false, loginError: "", timeout: null}
      $scope.signupObj = {visible: false, firstName: "", lastName: "", phone: "", email: "", password: "", confirm: "", isSigningUp: false, signupError: "", timeout: null}
    }, 300);

    $rootScope.$broadcast("modalHidden");
  }

  // Show sell modal
  $scope.showSellModal = function() {
    if(!rootScope.validateUser()) {
      return;
    }

    // Disable body scroll and set variables
    $rootScope.bodyScroll = false;
    $scope.sellObj.visible = true;
    $rootScope.showModal = true;
  }

  // Show login modal
  $scope.showLoginModal = function() {
    // Disable body scroll and set variables
    $scope.loginObj.visible = true;
    $scope.signupObj.visible = false;
    $rootScope.bodyScroll = false;
    $rootScope.showModal = true;
  }

  // Show signup modal
  $scope.showSignupModal = function() {
    // Disable body scroll and set variables
    $scope.signupObj.visible = true;
    $scope.loginObj.visible = false;
    $rootScope.bodyScroll = false;
    $rootScope.showModal = true;
  }

  // Login User
  $scope.loginUser = function() {
    // Stop if already logging in
    if($scope.loginObj.isLoggingIn)
      return;

    // Reset login variables
    $timeout.cancel($scope.loginObj.timeout);
    $scope.loginObj.loginError = "";
   
    // Double check input
    if(!$scope.loginObj.email || !$scope.loginObj.password) {
      $scope.loginObj.loginError = "Please enter all fields";
    } else if(!validateEmail($scope.loginObj.email)) {
      $scope.loginObj.loginError = "Please enter a valid email";
    }

    // Set a timeout to hide the error
    if($scope.loginObj.loginError) {
      $scope.loginObj.timeout = $timeout(function() {
        $scope.loginObj.loginError = "";
      }, 1500);

      return;
    }

    // Set new variables
    $scope.loginObj.isLoggingIn = true;

    // Make Parse request
    Parse.User.logIn($scope.loginObj.email, $scope.loginObj.password).then(function(_user) {
      $scope.loginObj.isLoggingIn = false;
      $scope.hideSuperModal();
    }, function(error) {
      $scope.loginObj.isLoggingIn = false;

      if(error.code == 101)
        $scope.loginObj.loginError = "Invalid credentials... Try again";
      else
        $scope.loginObj.loginError = "Login failed... Try again";

      $scope.loginObj.timeout = $timeout(function() {
        $scope.loginObj.loginError = "";
      }, 1500);
    });
  }

  // Signup User
  $scope.signupUser = function() {
    // Stop if already logging in
    if($scope.signupObj.isSigningUp)
      return;

    // Reset login variables
    $timeout.cancel($scope.signupObj.timeout);
    $scope.signupObj.signupError = "";
   
    // Double check input
    if(!$scope.signupObj.firstName || !$scope.signupObj.lastName || !$scope.signupObj.phone || !$scope.signupObj.email || !$scope.signupObj.password || !$scope.signupObj.confirm) {
      $scope.signupObj.signupError = "Please enter all fields";
    } else if(!validateEmail($scope.signupObj.email)) {
      $scope.signupObj.signupError = "Please enter a valid email";
    } else if($scope.signupObj.password != $scope.signupObj.confirm) {
      $scope.signupObj.signupError = "Passwords don't match";
    } else if(!parseInt($scope.signupObj.phone) || ("" + parseInt($scope.signupObj.phone)).length != 10) {
      $scope.signupObj.signupError = "Please enter a valid phone";
    }

    // Set a timeout to hide the error
    if($scope.signupObj.signupError) {
      $scope.signupObj.timeout = $timeout(function() {
        $scope.signupObj.signupError = "";
      }, 1500);

      return;
    }

    // Set new variables
    $scope.signupObj.isSigningUp = true;

    // Create new Parse User
    var user = new Parse.User();
    user.set("email", $scope.signupObj.email);
    user.set("username", $scope.signupObj.email);
    user.set("password", $scope.signupObj.password);
    user.set("firstName", $scope.signupObj.firstName);
    user.set("lastName", $scope.signupObj.lastName);
    user.set("phone", parseInt($scope.signupObj.phone));

    // Make Parse request
    user.signUp(null).then(function(_user) {
      $scope.signupObj.isSigningUp = false;
      $scope.hideSuperModal();
    }, function(error) {
      $scope.signupObj.isSigningUp = false;

      console.log(error);
      if(error.code == 202)
        $scope.signupObj.signupError = "Email already exists... Try again";
      else
        $scope.signupObj.signupError = "Signup failed... Try again";

      $scope.signupObj.timeout = $timeout(function() {
        $scope.signupObj.signupError = "";
      }, 1500);
    });
  }
})

;