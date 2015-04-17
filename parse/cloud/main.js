// Require modules
var _ = require('underscore');

// Parse Objects
var Book = Parse.Object.extend("Book");

// Get recent books posted
Parse.Cloud.define("recentBooks", function(request, response) {
	var query = new Parse.Query(Book);
	query.equalTo("sold", false);
	query.addDescending("updatedAt");
	query.limit(12);

	if(request.params.skip)
		query.skip(request.params.skip)

	query.find({
		useMasterKey: true,
		success: function(list) {
			response.success(list);
		},
		error: function(error) {
			response.error(error);
		}
	})
});

// Search for a book
Parse.Cloud.define("searchQuery", function(request, response) {
	if(!request.params.query) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var query = new Parse.Query(Book);
	query.contains("searchField", request.params.query);
	query.limit(12);

	if(request.params.skip)
		query.skip(request.params.skip)

	query.find({
		useMasterKey: true,
		success: function(list) {
			response.success(list);
		},
		error: function(error) {
			response.error(error);
		}
	})
});

// Add a book posting
Parse.Cloud.define("addBook", function(request, response) {
	if(!request.user) {
		response.error("Error: Invalid User");
		return;
	} else if(!request.params.bookName || !request.params.ISBN || !request.params.edition || !request.params.condition || !request.params.courseName || !request.params.courseTaken || !request.params.price) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var book = new Book();
	book.set("user", request.user);
	book.set("name", request.params.bookName);
	book.set("ISBN", parseInt(request.params.ISBN));
	book.set("edition", parseInt(request.params.edition));
	book.set("condition", request.params.condition);
	book.set("courseName", request.params.courseName);
	book.set("courseTaken", request.params.courseTaken);
	book.set("notes", request.params.notes);
	book.set("price", parseInt(request.params.price));
	book.set("pictureURL", request.params.pictureUrl);
	book.set("sold", false);
	book.set("numViews", 1);

	var searchField = request.params.bookName.toLowerCase() + " " + request.params.courseName.toLowerCase() + " " + request.params.ISBN;
	book.set("searchField", searchField);

	book.save(null, {
		useMasterKey: true,
		success: function() {
			response.success(book);
		},
		error: function(error) {
			response.error(error);
		}
	})
});

// Get user's selling history
Parse.Cloud.define("sellingHistory", function(request, response) {
	if(!request.user) {
		response.error("Error: Invalid User");
		return;
	} 

	var query = new Parse.Query(Book);
	query.equalTo("user", request.user);
	query.addDescending("sold");
	query.limit(1000);

	query.find({
		useMasterKey: true,
		success: function(list) {
			var result = {selling: [], sold: []};

			for(var index = 0; index < list.length; index++) {
				if(list[index].get("sold"))
					result.sold.push(list[index]);
				else
					result.selling.push(list[index]);
			}

			response.success(result);
		},
		error: function(error) {
			response.error(error);
		}
	})
});