angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
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
    "\n" +
    "      <div class=\"col-md-3 col-sm-6 col-xs-12\" ng-repeat=\"book in recentBooksObj.results\">\n" +
    "        <div class=\"book-card\" ng-click=\"showBookModal(book)\">\n" +
    "          <div class=\"picture-holder\">\n" +
    "            <div class=\"picture-overlay\">\n" +
    "              <div class=\"table-layout\">\n" +
    "                <div class=\"cell\">\n" +
    "                  <div class=\"title\">${{book.get('price')}}</div>\n" +
    "                  <div class=\"tip\">{{book.get('numViews')}} Views Today</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"picture\" back-img=\"{{book.get('picture').url()}}\"></div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"info-holder\">\n" +
    "            <div class=\"title\">{{book.get('name')}}</div>\n" +
    "            <div class=\"subtitle\">{{book.get('courseName')}} ({{book.get('courseTaken')}})</div>\n" +
    "            <div class=\"tip\">{{book.get('condition')}} &bull; {{getBookPostedDate(book)}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "        <!-- <div class=\"col-md-3 col-sm-6 col-xs-12\">\n" +
    "          <div class=\"book-card\">\n" +
    "            <div class=\"picture-holder\">\n" +
    "              <div class=\"picture-overlay\">\n" +
    "                <div class=\"table-layout\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <div class=\"title\">$70</div>\n" +
    "                    <div class=\"tip\">25 Views Today</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"picture\" style=\"background-image:url('http://ecx.images-amazon.com/images/I/41-Ky4pFKvL.jpg')\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"info-holder\">\n" +
    "              <div class=\"title\">Linear Algebra with Applications</div>\n" +
    "              <div class=\"subtitle\">MATH 214 (Fall 2013)</div>\n" +
    "              <div class=\"tip\">Brand New &bull; Posted 5 days ago</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-3 col-sm-6 col-xs-12\">\n" +
    "          <div class=\"book-card\">\n" +
    "            <div class=\"picture-holder\">\n" +
    "              <div class=\"picture-overlay\">\n" +
    "                <div class=\"table-layout\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <div class=\"title\">$45</div>\n" +
    "                    <div class=\"tip\">12 Views Today</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"picture\" style=\"background-image:url('http://ecx.images-amazon.com/images/I/51HPG8BdCTL.jpg')\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"info-holder\">\n" +
    "              <div class=\"title\">Discrete Mathematics and its Applications</div>\n" +
    "              <div class=\"subtitle\">EECS 203 (Fall 2014)</div>\n" +
    "              <div class=\"tip\">Like New &bull; Posted 5 days ago</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-3 col-sm-6 col-xs-12\">\n" +
    "          <div class=\"book-card\">\n" +
    "            <div class=\"picture-holder\">\n" +
    "              <div class=\"picture-overlay\">\n" +
    "                <div class=\"table-layout\">\n" +
    "                  <div class=\"cell\">\n" +
    "                    <div class=\"title\">$70</div>\n" +
    "                    <div class=\"tip\">25 Views Today</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"picture\" style=\"background-image:url('http://ecx.images-amazon.com/images/I/51fa7TBpc3L.jpg')\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"info-holder\">\n" +
    "              <div class=\"title\">A Handbook of Contemporary Spanish Grammar</div>\n" +
    "              <div class=\"subtitle\">SPANISH 232 (Winter 2015)</div>\n" +
    "              <div class=\"tip\">Like New &bull; Posted 12 days ago</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div> -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div> ");
}]);
