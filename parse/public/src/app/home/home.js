angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'ui.bootstrap',
  'parse-angular',
  "ngAnimate"
])

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

.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')'
            });
        });
    };
})

.controller( 'HomeCtrl', function HomeController( $scope, $rootScope, $timeout ) {
  $scope.showModal = false;
  $scope.bookModal = {visible: false, selectedBook: null}

  $scope.searchBooksObj = {query: "", isLoading: false, noResults: false, errorLoading: false, results: []}
  $scope.recentBooksObj = {isLoading: false, noResults: false, errorLoading: false, results: []}

  $scope.doNothing = function() {

  }

  $scope.getBookPostedDate = function(book) {
    return "Posted " + moment(book.createdAt).fromNow(); 
  }

  $scope.showBookModal = function(book) {
    $scope.bookModal.selectedBook = book;
    $scope.bookModal.visible = true;

    $scope.showModal = true;
  }

  $scope.hideModal = function() {
    $scope.showModal = false;

    $timeout(function() {
      $scope.bookModal = {visible: false, selectedBook: null}
    }, 300);
  }

  $scope.contactSeller = function() {

  }

  $scope.searchBooks = function() {
    if($scope.searchBooksObj.isLoading)
      return;

    if($scope.searchBooksObj.query == "")
      return;

    $scope.searchBooksObj.isLoading = true;
    $scope.searchBooksObj.noResults = false;
    $scope.searchBooksObj.errorLoading = false;

    Parse.Cloud.run("searchQuery", {query: $scope.searchBooksObj.query}).then(function(list) {
      $scope.searchBooksObj.isLoading = false;
      
      if(list.length) {
        $scope.searchBooksObj.results = list;
      } else {
        $scope.searchBooksObj.noResults = true;
      }

      console.log(list);
    }, function(error) {
      $scope.searchBooksObj.isLoading = false;
      $scope.searchBooksObj.errorLoading = true;
    });
  }

  $scope.loadRecentBooks = function() {
    if($scope.recentBooksObj.isLoading)
      return;

    $scope.recentBooksObj.isLoading = true;
    $scope.recentBooksObj.noResults = false;
    $scope.recentBooksObj.errorLoading = false;

    Parse.Cloud.run("recentBooks", {}).then(function(list) {
      $scope.recentBooksObj.isLoading = false;
      
      if(list.length) {
        $scope.recentBooksObj.results = list;
      } else {
        $scope.recentBooksObj.noResults = true;
      }

      $scope.bookModal.selectedBook = $scope.recentBooksObj.results[0];
    }, function(error) {
      $scope.recentBooksObj.isLoading = false;
      $scope.recentBooksObj.errorLoading = true;
    });
  }

  $scope.loadRecentBooks();
})

;