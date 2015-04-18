angular.module('templates-app', ['about/about.tpl.html', 'account/account.tpl.html', 'home/home.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"about-page\">\n" +
    "	About us!\n" +
    "</div>");
}]);

angular.module("account/account.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.tpl.html",
    "<div class=\"account-page\">\n" +
    "	<div class=\"jumbotron\">\n" +
    "    <div class=\"overlay\"></div>\n" +
    "    \n" +
    "    <div class=\"table-layout\">\n" +
    "      <div class=\"cell\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-12 col-sm-12\">\n" +
    "              <h1>Account</h1>\n" +
    "          \n" +
    "              <p>\n" +
    "              	Use this page to update your personal details and manage the books you are selling or have sold.\n" +
    "              </p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main-content\">\n" +
    "  	<div class=\"container\">\n" +
    "  		<div class=\"row\">\n" +
    "  			<div class=\"col-md-8 col-md-offset-2\">\n" +
    "			  	<div class=\"info-card\">\n" +
    "			  		<div class=\"info-header\">\n" +
    "			  			<div class=\"title\">Update Profile</div>\n" +
    "			  			<div class=\"subtitle\">Feel free to update any personal information whenever you want. <strong>Remember</strong>, we don't share your phone number with anyone.</div>\n" +
    "			  		</div>\n" +
    "\n" +
    "			  		<form class=\"info-content\" ng-submit=\"updateUser()\">\n" +
    "			        <div class=\"label\">First Name</div>\n" +
    "			        <div class=\"input-holder\">\n" +
    "			          <input type=\"text\" ng-model=\"userObj.firstName\" />\n" +
    "			        </div>\n" +
    "\n" +
    "			        <div class=\"label\">Last Name</div>\n" +
    "			        <div class=\"input-holder\">\n" +
    "			          <input type=\"text\" ng-model=\"userObj.lastName\" />\n" +
    "			        </div>\n" +
    "\n" +
    "			        <div class=\"label\">Phone Number</div>\n" +
    "			        <div class=\"input-holder\">\n" +
    "			          <input type=\"text\" placeholder=\"No Dashes\" ng-model=\"userObj.phone\" />\n" +
    "			        </div>\n" +
    "\n" +
    "			        <div class=\"label\">E-Mail</div>\n" +
    "			        <div class=\"input-holder\">\n" +
    "			          <input type=\"email\" ng-model=\"userObj.email\" />\n" +
    "			        </div>\n" +
    "\n" +
    "			        <div class=\"input-holder button-holder\">\n" +
    "			          <button type=\"submit\" class=\"btn btn-block\" ng-class=\"{'btn-primary':!userObj.updateError, 'btn-danger':userObj.updateError, 'btn-success':userObj.updated}\" ng-click=\"updateUser()\">\n" +
    "			            <span ng-if=\"!userObj.isUpdating && !userObj.updateError && !userObj.updated\">Save</span>\n" +
    "			            <span ng-if=\"userObj.isUpdating\">Updating...</span>\n" +
    "			            <span ng-if=\"userObj.updateError\">{{userObj.updateError}}</span>\n" +
    "			            <span ng-if=\"userObj.updated\">Updated</span>\n" +
    "			          </button>\n" +
    "			        </div>\n" +
    "			      </form>\n" +
    "			  	</div>\n" +
    "\n" +
    "			  	<div class=\"info-card\">\n" +
    "			  		<div class=\"info-header\">\n" +
    "			  			<div class=\"title\">Books Selling</div>\n" +
    "			  			<div class=\"subtitle\">Feel free to update the books you are selling and remember to mark them as sold!</div>\n" +
    "			  		</div>\n" +
    "\n" +
    "			  		<div class=\"info-content\" style=\"padding: 0 15px;\">\n" +
    "			  			<div class=\"text\" ng-if=\"!booksObj.sellingResults.length && !booksObj.isLoading && !booksObj.errorLoading\">You haven't started selling books yet! Get started now by <a ng-click=\"showSellModal()\">clicking here</a>.</div>\n" +
    "\n" +
    "			  			<div class=\"text loading-text\" ng-if=\"booksObj.isLoading && !booksObj.errorLoading\">\n" +
    "					      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "			  			</div>\n" +
    "\n" +
    "			  			<div class=\"text\" ng-if=\"booksObj.errorLoading\">\n" +
    "			  				Ahhh. There was an error in loading your books data. Click <a ng-click=\"loadSellingHistory()\">here</a> to try again or email us at <a href=\"mailto:prateeks@umich.edu\">prateeks@umich.edu</a> for immediate help.\n" +
    "		  				</div>\n" +
    "\n" +
    "			  			<div class=\"book-list\" ng-if=\"!booksObj.isLoading && !booksObj.errorLoading && booksObj.sellingResults.length\">\n" +
    "			  				<div class=\"book-item\" ng-repeat=\"book in booksObj.sellingResults\">\n" +
    "			  					<div class=\"book-content\">\n" +
    "			  						<div class=\"title\">{{book.get('name')}}</div>\n" +
    "			  						<div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "			  						<div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "			  					</div>\n" +
    "			  					<div class=\"book-buttons\">\n" +
    "			  						<div class=\"table-layout\">\n" +
    "			  							<div class=\"cell\">\n" +
    "				  							<button class=\"btn btn-block btn-primary\" ng-click=\"editBook(book)\">Edit</button>\n" +
    "				  							<button class=\"btn btn-block btn-danger\" ng-click=\"markAsSold(book)\">\n" +
    "				  								Sold\n" +
    "			  								</button>\n" +
    "				  						</div>\n" +
    "				  					</div>\n" +
    "			  					</div>\n" +
    "			  				</div>\n" +
    "			  			</div>\n" +
    "		  			</div>\n" +
    "		  		</div>\n" +
    "\n" +
    "		  		<div class=\"info-card\" ng-if=\"booksObj.soldResults.length && !booksObj.isLoading && !booksObj.errorLoading\">\n" +
    "			  		<div class=\"info-header\">\n" +
    "			  			<div class=\"title\">Books Sold</div>\n" +
    "			  		</div>\n" +
    "\n" +
    "		  			<div class=\"info-content\" style=\"padding: 0 15px;\">\n" +
    "			  			<div class=\"book-list\" ng-if=\"booksObj.soldResults.length\">\n" +
    "			  				<div class=\"book-item\" ng-repeat=\"book in booksObj.soldResults\">\n" +
    "			  					<div class=\"book-content\">\n" +
    "			  						<div class=\"title\">{{book.get('name')}}</div>\n" +
    "			  						<div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "			  						<div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "			  					</div>\n" +
    "			  					<div class=\"book-buttons\">\n" +
    "			  						<div class=\"table-layout\">\n" +
    "			  							<div class=\"cell\">\n" +
    "				  							<button class=\"btn btn-block btn-danger\" ng-click=\"markAsUnsold(book)\">Re-List</button>\n" +
    "				  						</div>\n" +
    "				  					</div>\n" +
    "			  					</div>\n" +
    "			  				</div>\n" +
    "			  			</div>\n" +
    "		  			</div>\n" +
    "		  		</div>\n" +
    "\n" +
    "			  	</div>\n" +
    "		  	</div>\n" +
    "	  	</div>\n" +
    "  	</div>\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"close-container animate-if\" ng-show=\"bookModal.visible\" ng-click=\"hideModal()\">\n" +
    "  <i class=\"fa fa-times\"></i>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-overlay animate-if\" ng-show=\"bookModal.visible\" ng-click=\"hideModal()\">\n" +
    "  <div class=\"table-layout\">\n" +
    "    <div class=\"cell\">\n" +
    "      <div class=\"view-book-modal modal-container\" ng-click=\"doNothing()\" stop-event>\n" +
    "        <div class=\"book-picture\">\n" +
    "          <img src=\"{{bookModal.selectedBook.get('picture').url()}}\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"book-info\">\n" +
    "          <div class=\"info-header\">\n" +
    "            <div class=\"title\">{{bookModal.selectedBook.get('name')}}</div>\n" +
    "            <div class=\"subtitle\">{{bookModal.selectedBook.get('courseName')}} ({{bookModal.selectedBook.get('courseTaken')}})</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"info-content\">\n" +
    "            <div class=\"text\"><span class=\"label-item\">ISBN:</span> {{bookModal.selectedBook.get('ISBN')}}</div>\n" +
    "            <div class=\"text\"><span class=\"label-item\">Condition:</span> {{bookModal.selectedBook.get('condition')}}</div>\n" +
    "            <div class=\"text\"><span class=\"label-item\">Price:</span> ${{bookModal.selectedBook.get('price')}}</div>\n" +
    "            <div class=\"text\" ng-if=\"bookModal.selectedBook.get('notes')\">Notes: {{bookModal.selectedBook.get('notes')}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"buy-button\">\n" +
    "            <button class=\"btn btn-block {{bookModal.buttonColor}}\" ng-click=\"contactSeller()\">{{bookModal.buttonText}}</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
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
    "    <div class=\"loading-container error-container animate-if\" ng-show=\"searchBooksObj.errorLoading || recentBooksObj.errorLoading\">\n" +
    "      <div class=\"text\">Ahhh. There was an error in loading your books data. Click <a ng-click=\"loadSectionContent()\">here</a> to try again or email us at <a href=\"mailto:prateeks@umich.edu\">prateeks@umich.edu</a> for immediate help.</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading-container error-container animate-if\" ng-show=\"searchBooksObj.visible && !searchBooksObj.results.length && !searchBooksObj.isLoading\">\n" +
    "      <i class=\"fa fa-frown-o\"></i>\n" +
    "      <div class=\"text\">There were no search results for your query... Please check your spelling!</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading-container error-container animate-if\" ng-show=\"recentBooksObj.visible && !recentBooksObj.results.length && !recentBooksObj.isLoading\">\n" +
    "      <i class=\"fa fa-frown-o\"></i>\n" +
    "      <div class=\"text\">There are currently no books in our database. Please try again later!</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"book-cards animate-if\" ng-show=\"searchBooksObj.visible && searchBooksObj.results.length && !searchBooksObj.isLoading && !searchBooksObj.errorLoading\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"row\">  \n" +
    "          <div class=\"col-md-3 col-sm-6 col-xs-6\" ng-repeat=\"book in searchBooksObj.results\">\n" +
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
    "\n" +
    "                <div class=\"picture\" ng-if=\"book.get('picture')\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "                \n" +
    "                <div class=\"picture sad-face table-layout\" ng-if=\"!book.get('picture')\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <i class=\"fa fa-exclamation-circle\"></i>\n" +
    "                    <div class=\"text\">No Image Yet</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"info-holder\">\n" +
    "                <div class=\"padded-holder\">\n" +
    "                  <div class=\"title\">{{truncatedBookname(book.get('name'))}}</div>\n" +
    "                  <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "                  <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"book-cards animate-if\" ng-show=\"recentBooksObj.visible && recentBooksObj.results.length && !recentBooksObj.isLoading && !recentBooksObj.errorLoading\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"row\">  \n" +
    "          <div class=\"col-md-3 col-sm-6 col-xs-6 animate-if\" ng-repeat=\"book in recentBooksObj.results\">\n" +
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
    "\n" +
    "                <div class=\"picture\" ng-if=\"book.get('picture')\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "                \n" +
    "                <div class=\"picture sad-face table-layout\" ng-if=\"!book.get('picture')\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <i class=\"fa fa-exclamation-circle\"></i>\n" +
    "                    <div class=\"text\">No Image Yet</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"info-holder\">\n" +
    "                <div class=\"padded-holder\">\n" +
    "                  <div class=\"title\">{{truncatedBookname(book.get('name'))}}</div>\n" +
    "                  <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "                  <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div> ");
}]);
