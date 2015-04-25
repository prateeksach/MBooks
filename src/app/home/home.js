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
  $scope.bookModal = {visible: false, selectedBook: null, buttonText:"E-Mail Seller", buttonColor: "btn-primary"}

  // Objects for recent books and searching
  $scope.searchBooksObj = {visible: false, query: "", isLoading: false, noResults: false, errorLoading: false, results: []}
  $scope.recentBooksObj = {visible: true, isLoading: false, noResults: false, errorLoading: false, results: []}

  // Empty function to avoid event bubbling
  $scope.doNothing = function() {

  }

  // Load appropriate depending on what's visible
  $scope.loadSectionContent = function() {
    if($scope.searchBooksObj.visible)
      $scope.searchBooks();
    else
      $scope.loadRecentBooks();
  }

  // Truncate name to fit in two lines 
  $scope.truncatedBookname = function(name) {
    return name.length > 45 ? removeWhitespace(name.substr(0, 45)) + "..." : name;
  }

  // Show all books
  $scope.showAllBooks = function() {
    $scope.searchBooksObj.visible = false;
    $scope.searchBooksObj.query = "";
    $scope.recentBooksObj.visible = true;
  }

  // Format the text for book cards (i.e. "Posted 5 days ago")
  $scope.getBookPostedDate = function(book) {
    return "Posted " + moment(book.createdAt).fromNow(); 
  }

  // Show a book modal
  $scope.showBookModal = function(book) {
    // Allow for body scroll
    $rootScope.bodyScroll = false;

    // Assign the book to the modal variable
    $scope.bookModal.selectedBook = book;
    $scope.bookModal.visible = true;

    // Increment number of views on Parse.
    Parse.Cloud.run("incrementViews", {bookId: book.id}).then(function() {
      book.set("numViews", book.get('numViews') + 1);
    }, function(error) {

    })
  }

  // Hide modal
  $scope.hideModal = function() {
    $scope.bookModal.visible = false;
    $rootScope.bodyScroll = true;
    
    // Delay before resetting the modal variables to avoid glitches
    $timeout(function() {
      $scope.bookModal = {visible: false, selectedBook: null, buttonText:"E-Mail Seller", buttonColor: "btn-primary"}
    }, 300);
  }

  // Contact the seller of the book (requires login)
  $scope.contactSeller = function() {
    if(!$rootScope.validateUser()) {
      $scope.bookModal.buttonColor = "btn-danger";
      $scope.bookModal.buttonText = "Please login or signup first";
      return;
    }

    var link = "mailto:" + $scope.bookModal.selectedBook.get("user") + "?subject=MBooks: Interested in your book&body=" + "Hey, I want to buy your " + $scope.bookModal.selectedBook.get("courseName") + " book (" + removeSpecialChars($scope.bookModal.selectedBook.get("name")) + ") for $" + $scope.bookModal.selectedBook.get("price") + ". Is it still available and if so, how can I get it? Thanks!";
    window.location.href = link;
  }

  // Search books
  $scope.searchBooks = function() {
    // Stop if already searching
    if($scope.searchBooksObj.isLoading)
      return;

    // Stop if empty query
    if($scope.searchBooksObj.query == "") {
      $scope.showAllBooks();
      $scope.searchBooksObj.results = [];
      return;
    }

    // Show search results
    $scope.recentBooksObj.visible = false;
    $scope.searchBooksObj.visible = true;

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
        $scope.searchBooksObj.results = [];
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
        $scope.recentBooksObj.results = [];
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