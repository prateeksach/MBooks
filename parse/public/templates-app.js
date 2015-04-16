angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"modal-overlay animate-if\" ng-if=\"showModal\" ng-click=\"hideSuperModal()\">\n" +
    "  <div class=\"close-container\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"table-layout\">\n" +
    "    <div class=\"cell\">\n" +
    "      <div class=\"view-book-modal modal-container\" ng-show=\"bookModal.visible\" ng-click=\"doNothing()\" stop-event>\n" +
    "        <div class=\"book-picture\" back-img=\"{{bookModal.selectedBook.get('picture').url()}}\"></div>\n" +
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
    "      \n" +
    "      <div class=\"login-signup-modal login-modal modal-container\" ng-show=\"loginObj.visible\" ng-click=\"doNothing()\" stop-event>\n" +
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
    "      <div class=\"login-signup-modal signup-modal modal-container\" ng-show=\"signupObj.visible\" ng-click=\"doNothing()\" stop-event>\n" +
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
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-9 col-sm-12\">\n" +
    "          <h1>Find Books on Campus</h1>\n" +
    "      \n" +
    "          <p>\n" +
    "            Have you been using Facebook groups to buy and sell groups? Does it suck? Then, this is what you need. We're a one-stop shop for books at the University of Michigan.\n" +
    "          </p>\n" +
    "\n" +
    "          <form class=\"search-holder\" ng-submit=\"searchBooks()\">\n" +
    "            <div class=\"input-holder\">\n" +
    "              <input type=\"text\" placeholder=\"Search by book name, course name, ISBN\" ng-model=\"searchBooksObj.query\" />\n" +
    "            </div>\n" +
    "            <div class=\"input-holder button-holder\">\n" +
    "              <button type=\"submit\" ng-click=\"searchBooks()\" class=\"btn btn-primary btn-lg\">Search</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"book-cards\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-sm-6 col-xs-12\" ng-repeat=\"book in searchBooksObj.results\" ng-if=\"searchBooksObj.results.length\">\n" +
    "          <div class=\"book-card\" ng-click=\"showBookModal(book)\">\n" +
    "            <div class=\"picture-holder\">\n" +
    "              <div class=\"picture-overlay\">\n" +
    "                <div class=\"table-layout\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <div class=\"title\">${{book.get('price')}}</div>\n" +
    "                    <div class=\"tip\">{{book.get('numViews')}} Views Today</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"picture\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"info-holder\">\n" +
    "              <div class=\"title\">{{book.get('name')}}</div>\n" +
    "              <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "              <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-3 col-sm-6 col-xs-12\" ng-repeat=\"book in recentBooksObj.results\" ng-if=\"!searchBooksObj.results.length\">\n" +
    "          <div class=\"book-card\" ng-click=\"showBookModal(book)\">\n" +
    "            <div class=\"picture-holder\">\n" +
    "              <div class=\"picture-overlay\">\n" +
    "                <div class=\"table-layout\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <div class=\"title\">${{book.get('price')}}</div>\n" +
    "                    <div class=\"tip\">{{book.get('numViews')}} Views Today</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"picture\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"info-holder\">\n" +
    "              <div class=\"title\">{{book.get('name')}}</div>\n" +
    "              <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "              <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div> ");
}]);
