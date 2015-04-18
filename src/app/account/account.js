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
.controller( 'AccountCtrl', function HomeController( $scope, $rootScope, $timeout, $state ) {
  // Redirect if not logged in 
  if(!$rootScope.validateUser()) {
    $state.go("home");
    return;
  }

  // Variables for sections
  $scope.userObj = {firstName: Parse.User.current().get('firstName'), lastName: Parse.User.current().get('lastName'), phone: Parse.User.current().get('phone'), email: Parse.User.current().get('email'), isUpdating: false, updateError: "", updated: false, timeout: null}
  $scope.booksObj = {sellingResults: [], soldResults: [], noSellingResults: false, noSoldResults: false, isLoading: false, errorLoading: false}

  // Format the text for book cards (i.e. "Posted 5 days ago")
  $scope.getBookPostedDate = function(book) {
    return "Posted " + moment(book.createdAt).fromNow(); 
  }

  // Reset password
  $scope.resetPassword = function() {
    Parse.User.requestPasswordReset(Parse.User.current().get("email")).then(function() {
      alert("Check your email for instructions on how to reset your password.");
    }, function() {
      alert("An error occured. Please try again or contact us for immediate feedback.");
    })
  }

  $scope.updateUser = function() {
    // Stop if already updating
    if($scope.userObj.isUpdating)
      return;
   
    // Reset variables
    $timeout.cancel($scope.userObj.timeout);
    $scope.userObj.updateError = "";
    $scope.userObj.updated = false;

    // Double check input
    if(!$scope.userObj.firstName || !$scope.userObj.lastName || !$scope.userObj.phone || !$scope.userObj.email) {
      $scope.userObj.updateError = "Please enter all fields";
    } else if(!validateEmail($scope.userObj.email)) {
      $scope.userObj.updateError = "Please enter a valid email";
    } else if(!parseInt($scope.userObj.phone) || ("" + parseInt($scope.userObj.phone)).length != 10) {
      $scope.userObj.updateError = "Please enter a valid phone";
    }

    // Set a timeout to hide the error
    if($scope.userObj.updateError) {
      $scope.userObj.timeout = $timeout(function() {
        $scope.userObj.updateError = "";
      }, 1500);

      return;
    }
    
    // Set new variables
    $scope.userObj.isUpdating = true;

    Parse.User.current().set("firstName", $scope.userObj.firstName);
    Parse.User.current().set("lastName", $scope.userObj.lastName);
    Parse.User.current().set("phone", parseInt($scope.userObj.phone));
    Parse.User.current().set("email", $scope.userObj.email);
    Parse.User.current().set("username", $scope.userObj.email);

    // Make Parse request
    Parse.User.current().save(null).then(function() {
      $scope.userObj.isUpdating = false;
      $scope.userObj.updated = true;

      $scope.userObj.timeout = $timeout(function() {
        $scope.userObj.updated = false;
      }, 1500);
    }, function(error) {
      $scope.userObj.isUpdating = false;
      $scope.userObj.updateError = "Update failed... Try again";

      $scope.userObj.timeout = $timeout(function() {
        $scope.userObj.updateError = "";
      }, 1500);
    });
  }

  // Mark a book as sold
  $scope.markAsSold = function(book) {
    Parse.Cloud.run("markAsSold", {bookId: book.id}).then(function() {
      location.reload();
    }, function(error) {
      alert("Unable to mark as sold. Please try again or contact us for immediate help.");
    })
  } 

  // Relist a book
  $scope.markAsUnsold = function(book) {
    Parse.Cloud.run("markAsUnsold", {bookId: book.id}).then(function() {
      location.reload();
    }, function(error) {
      alert("Unable to re-list the book. Please try again or contact us for immediate help.");
    })
  } 

  // Load books selling and books sold
  $scope.loadSellingHistory = function() {
    // Stop if already fetching
    if($scope.booksObj.isLoading)
      return;

    // Reset variables before starting request
    $scope.booksObj.isLoading = true;
    $scope.booksObj.noSellingResults = false;
    $scope.booksObj.noSoldResults = false;
    $scope.booksObj.errorLoading = false;

    // Make a Parse request for recent books
    Parse.Cloud.run("sellingHistory", {}).then(function(result) {
      $scope.booksObj.isLoading = false;

      // Assign variables depending on if any results
      if(result.selling.length) {
        $scope.booksObj.sellingResults = result.selling;
      } else {
        $scope.booksObj.sellingResults = [];
        $scope.booksObj.noSellingResults = true;
      }

      if(result.sold.length) {
        $scope.booksObj.soldResults = result.sold;
      } else {
        $scope.booksObj.soldResults = [];
        $scope.booksObj.noSoldResults = true;
      }
    }, function(error) {
      // Show error to user if API request failed
      $scope.booksObj.isLoading = false;
      $scope.booksObj.errorLoading = true;
    });
  }

  // Load selling history on load
  $scope.loadSellingHistory();

  // Listen for when a book is added and reload selling history
  $scope.$on("bookAdded", function() {
    $scope.loadSellingHistory();
  })
})

;