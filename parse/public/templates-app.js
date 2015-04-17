angular.module('templates-app', ['about/about.tpl.html', 'account/account.tpl.html', 'home/home.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"about-page\">\n" +
    "	About us!\n" +
    "</div>");
}]);

angular.module("account/account.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.tpl.html",
    "<div class=\"about-page\">\n" +
    "	About us!\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"close-container animate-if\" ng-show=\"showModal\" ng-click=\"hideSuperModal()\">\n" +
    "  <i class=\"fa fa-times\"></i>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-overlay animate-if\" ng-show=\"showModal\" ng-click=\"hideSuperModal()\">\n" +
    "  <div class=\"table-layout\">\n" +
    "    <div class=\"cell\">\n" +
    "      <div class=\"view-book-modal modal-container\" ng-show=\"bookModal.visible\" ng-click=\"doNothing()\" stop-event>\n" +
    "        <div class=\"book-picture\" back-img=\"{{bookModal.selectedBook.get('picture').url()}}\"></div>\n" +
    "\n" +
    "        <div class=\"book-info\">\n" +
    "          <div class=\"info-header\">\n" +
    "            <div class=\"title\">{{bookModal.selectedBook.get('name')}}</div>\n" +
    "            <div class=\"subtitle\">{{bookModal.selectedBook.get('courseName')}} ({{bookModal.selectedBook.get('courseTaken')}})</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"info-content\">\n" +
    "            <div class=\"text\">ISBN: {{bookModal.selectedBook.get('ISBN')}}</div>\n" +
    "            <div class=\"text\">Condition: {{bookModal.selectedBook.get('condition')}}</div>\n" +
    "            <div class=\"text\">Price: ${{bookModal.selectedBook.get('price')}}</div>\n" +
    "            <div class=\"text\" ng-if=\"bookModal.selectedBook.get('notes')\">Notes: {{bookModal.selectedBook.get('notes')}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"info-footer\">\n" +
    "            <button class=\"btn btn-primary btn-lg btn-block\" ng-click=\"contactSeller()\">Inquire About Book</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"input-modal sell-book-modal modal-container\" ng-show=\"sellObj.visible\" ng-click=\"doNothing()\" stop-event>\n" +
    "        <div class=\"info-header\">\n" +
    "          <div class=\"title\">Sell Book</div>\n" +
    "          <div class=\"subtitle\">Please fill out all required* fields to sell a book. When someone is interested, we will send you an email and you can initiate the conversation.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <form class=\"info-content\" ng-submit=\"addBook()\">\n" +
    "          <div class=\"label\">Book Name*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.bookName\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Picture URL (Use stock photo from Google or Amazon)</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" placeholder=\"We approve each picture so don't get any ideas!\" ng-model=\"sellObj.pictureUrl\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">ISBN*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.ISBN\" placeholder=\"Back of the book!\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Edition*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.edition\" placeholder=\"Numbers only. Use '1' if no edition.\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Course Name*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.courseName\" placeholder=\"EECS 203, MATH 214, etc.\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">When was the course taken?*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.courseTaken\" placeholder=\"Winter 2013, Fall 2015, etc.\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Price*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.price\" placeholder=\"Just numbers please\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Condition*</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.condition\" placeholder=\"New, Like New, Used, Acceptable, Worn\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Notes</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"sellObj.notes\" placeholder=\"\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"input-holder button-holder\">\n" +
    "            <button type=\"submit\" class=\"btn btn-block\" ng-class=\"{'btn-primary':!sellObj.addingError, 'btn-danger':sellObj.addingError}\" ng-click=\"addBook()\">\n" +
    "              <span ng-if=\"!sellObj.isAdding && !sellObj.addingError\">Add Book</span>\n" +
    "              <span ng-if=\"sellObj.isAdding\">Adding...</span>\n" +
    "              <span ng-if=\"sellObj.addingError\">{{sellObj.addingError}}</span>\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"input-modal login-modal modal-container\" ng-show=\"loginObj.visible\" ng-click=\"doNothing()\" stop-event>\n" +
    "        <div class=\"info-header\">\n" +
    "          <div class=\"title\">Login</div>\n" +
    "          <div class=\"subtitle\">Please login to buy and sell on MBooks. Or <span class=\"link\" ng-click=\"showSignupModal()\">signup</span> if you're not a member yet.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <form class=\"info-content\" ng-submit=\"loginUser()\">\n" +
    "          <div class=\"label\">E-Mail</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"email\" ng-model=\"loginObj.email\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Password</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"password\" ng-model=\"loginObj.password\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"input-holder button-holder\">\n" +
    "            <button type=\"submit\" class=\"btn btn-block\" ng-class=\"{'btn-primary':!loginObj.loginError, 'btn-danger':loginObj.loginError}\" ng-click=\"loginUser()\">\n" +
    "              <span ng-if=\"!loginObj.isLoggingIn && !loginObj.loginError\">Login</span>\n" +
    "              <span ng-if=\"loginObj.isLoggingIn\">Logging In...</span>\n" +
    "              <span ng-if=\"loginObj.loginError\">{{loginObj.loginError}}</span>\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"input-modal signup-modal modal-container\" ng-show=\"signupObj.visible\" ng-click=\"doNothing()\" stop-event>\n" +
    "        <div class=\"info-header\">\n" +
    "          <div class=\"title\">Signup</div>\n" +
    "          <div class=\"subtitle\">Please signup to buy and sell on MBooks. Or <span class=\"link\" ng-click=\"showLoginModal()\">login</span> if you're already a member.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <form class=\"info-content\" ng-submit=\"signupUser()\">\n" +
    "          <div class=\"label\">First Name</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"signupObj.firstName\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Last Name</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" ng-model=\"signupObj.lastName\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Phone Number (not shared without your permission)</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"text\" placeholder=\"No Dashes\" ng-model=\"signupObj.phone\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">E-Mail</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"email\" ng-model=\"signupObj.email\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Password</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"password\" ng-model=\"signupObj.password\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"label\">Confirm Password</div>\n" +
    "          <div class=\"input-holder\">\n" +
    "            <input type=\"password\" ng-model=\"signupObj.confirm\" />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"input-holder button-holder\">\n" +
    "            <button type=\"submit\" class=\"btn btn-block\" ng-class=\"{'btn-primary':!signupObj.signupError, 'btn-danger':signupObj.signupError}\" ng-click=\"loginUser()\">\n" +
    "              <span ng-if=\"!signupObj.isSigningUp && !signupObj.signupError\">Signup</span>\n" +
    "              <span ng-if=\"signupObj.isSigningUp\">Signing Up...</span>\n" +
    "              <span ng-if=\"signupObj.signupError\">{{signupObj.signupError}}</span>\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"home-page\">\n" +
    "  <div class=\"jumbotron\">\n" +
    "    <div class=\"overlay\"></div>\n" +
    "    \n" +
    "    <div class=\"table-layout\">\n" +
    "      <div class=\"cell\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-9 col-sm-12\">\n" +
    "              <h1>Find Books on Campus</h1>\n" +
    "          \n" +
    "              <p>\n" +
    "                Have you been using Facebook groups to buy and sell books? Does it suck? Then, this is what you need. We're a craigslist specifically for books at the University of Michigan.\n" +
    "              </p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content-container\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">  \n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"top-bar\">\n" +
    "            <div class=\"left-button\" ng-click=\"showAllBooks()\" ng-class=\"{'active':recentBooksObj.visible}\">Show All Books</div>\n" +
    "\n" +
    "            <div class=\"right-side\">\n" +
    "              <form class=\"search-holder\" ng-submit=\"searchBooks()\">\n" +
    "                <div class=\"input-holder\">\n" +
    "                  <input type=\"text\" placeholder=\"Or Search by Book Name, ISBN or Course Name (EECS 203, MATH 214)\" ng-model=\"searchBooksObj.query\" />\n" +
    "                </div>\n" +
    "\n" +
    "                <button type=\"submit\" ng-click=\"searchBooks()\" class=\"btn btn-primary btn-lg animate-if\" ng-show=\"searchBooksObj.query || searchBooksObj.visible\">Search</button>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading-container animate-if\" ng-show=\"searchBooksObj.isLoading || recentBooksObj.isLoading\">\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"book-cards animate-if\" ng-show=\"searchBooksObj.visible && searchBooksObj.results.length && !searchBooksObj.isLoading\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"row\">  \n" +
    "          <div class=\"col-md-3 col-sm-6 col-xs-12\" ng-repeat=\"book in searchBooksObj.results\">\n" +
    "            <div class=\"book-card\" ng-click=\"showBookModal(book)\">\n" +
    "              <div class=\"picture-holder\">\n" +
    "                <div class=\"picture-overlay\">\n" +
    "                  <div class=\"table-layout\">\n" +
    "                    <div class=\"cell\">\n" +
    "                      <div class=\"title\">${{book.get('price')}}</div>\n" +
    "                      <div class=\"tip\">{{book.get('numViews')}} Views</div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"picture\" ng-if=\"book.get('picture')\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "                <div class=\"picture sad-face table-layout\" ng-if=\"!book.get('picture')\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <i class=\"fa fa-frown-o\"></i>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"info-holder\">\n" +
    "                <div class=\"title\">{{book.get('name')}}</div>\n" +
    "                <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "                <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"book-cards animate-if\" ng-show=\"recentBooksObj.visible && recentBooksObj.results.length && !recentBooksObj.isLoading\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"row\">  \n" +
    "          <div class=\"col-md-3 col-sm-6 col-xs-12 animate-if\" ng-repeat=\"book in recentBooksObj.results\">\n" +
    "            <div class=\"book-card\" ng-click=\"showBookModal(book)\">\n" +
    "              <div class=\"picture-holder\">\n" +
    "                <div class=\"picture-overlay\">\n" +
    "                  <div class=\"table-layout\">\n" +
    "                    <div class=\"cell\">\n" +
    "                      <div class=\"title\">${{book.get('price')}}</div>\n" +
    "                      <div class=\"tip\">{{book.get('numViews')}} Views Today</div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"picture\" ng-if=\"book.get('picture')\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "                <div class=\"picture sad-face table-layout\" ng-if=\"!book.get('picture')\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <i class=\"fa fa-exclamation-circle\"></i>\n" +
    "                    <div class=\"text\">No Image Yet</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"info-holder\">\n" +
    "                <div class=\"title\">{{book.get('name')}}</div>\n" +
    "                <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "                <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div> ");
}]);
