// Define the Home Page module
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'ui.bootstrap',
  'parse-angular',
  "ngAnimate"
])

// Configuration of the URL
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

// Directive to stop event bubbling for modals
.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
})

// Directive to bind CSS image rule to elements
.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')'
            });
        });
    };
})

// Home page controller
.controller( 'HomeCtrl', function HomeController( $scope, $rootScope, $timeout ) {
  // Modal related variables
  $scope.showModal = false;
  $scope.bookModal = {visible: false, selectedBook: null}

  // Objects for recent books and searching
  $scope.searchBooksObj = {query: "", isLoading: false, noResults: false, errorLoading: false, results: []}
  $scope.recentBooksObj = {isLoading: false, noResults: false, errorLoading: false, results: []}

  // Empty function to avoid event bubbling
  $scope.doNothing = function() {

  }

  // Format the text for book cards (i.e. "Posted 5 days ago")
  $scope.getBookPostedDate = function(book) {
    return "Posted " + moment(book.createdAt).fromNow(); 
  }

  // Show a book modal
  $scope.showBookModal = function(book) {
    // Assign the book to the modal variable
    $scope.bookModal.selectedBook = book;
    $scope.bookModal.visible = true;

    $scope.showModal = true;
  }

  // Hide modal
  $scope.hideModal = function() {
    $scope.showModal = false;

    // Delay before resetting the modal variables to avoid glitches
    $timeout(function() {
      $scope.bookModal = {visible: false, selectedBook: null}
    }, 300);
  }

  // Contact the seller of the book (requires login)
  $scope.contactSeller = function() {

  }

  // Search books
  $scope.searchBooks = function() {
    // Stop if already searching
    if($scope.searchBooksObj.isLoading)
      return;

    // Stop if empty query
    if($scope.searchBooksObj.query == "")
      return;

    // Reset variables before starting request
    $scope.searchBooksObj.isLoading = true;
    $scope.searchBooksObj.noResults = false;
    $scope.searchBooksObj.errorLoading = false;

    // Make a Parse request with the query
    Parse.Cloud.run("searchQuery", {query: $scope.searchBooksObj.query}).then(function(list) {
      $scope.searchBooksObj.isLoading = false;
      
      // Assign variables depending on if any results
      if(list.length) {
        $scope.searchBooksObj.results = list;
      } else {
        $scope.searchBooksObj.noResults = true;
      }
    }, function(error) {
      // Show error to user if API request failed
      $scope.searchBooksObj.isLoading = false;
      $scope.searchBooksObj.errorLoading = true;
    });
  }

  // Load recent books that were posted
  $scope.loadRecentBooks = function() {
    // Stop if already fetching
    if($scope.recentBooksObj.isLoading)
      return;

    // Reset variables before starting request
    $scope.recentBooksObj.isLoading = true;
    $scope.recentBooksObj.noResults = false;
    $scope.recentBooksObj.errorLoading = false;

    // Make a Parse request for recent books
    Parse.Cloud.run("recentBooks", {}).then(function(list) {
      $scope.recentBooksObj.isLoading = false;
      
      // Assign variables depending on if any results
      if(list.length) {
        $scope.recentBooksObj.results = list;
      } else {
        $scope.recentBooksObj.noResults = true;
      }
    }, function(error) {
      // Show error to user if API request failed
      $scope.recentBooksObj.isLoading = false;
      $scope.recentBooksObj.errorLoading = true;
    });
  }

  // Load recent books on page load
  $scope.loadRecentBooks();
})

;