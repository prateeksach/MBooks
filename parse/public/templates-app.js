angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"modal-overlay animate-if\" ng-if=\"showModal\" ng-click=\"hideModal()\">\n" +
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
    "        <div class=\"col-md-3 col-sm-6 col-xs-12\" ng-repeat=\"book in recentBooksObj.results\">\n" +
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
