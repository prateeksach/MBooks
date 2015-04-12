// Require modules
var _ = require('underscore');

// Parse Objects
var Book = Parse.Object.extend("Book");

// Get recent books posted
Parse.Cloud.define("recentBooks", function(request, response) {
	var query = new Parse.Query(Book);
	query.equalTo("sold", false);
	query.addAscending("updatedAt");
	query.limit(15);

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

	var query1 = new Parse.Query(Book);
	query1.contains("name", request.params.query);

	var query2 = new Parse.Query(Book);
	query2.contains("courseName", request.params.query);

	var query3 = new Parse.Query(Book);
	query3.contains("ISBN", request.params.query);

	var query = Parse.Query.or(query1, query2, query3);
	query.limit(15);

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
	} else if(!request.params.name || !request.params.ISBN || !request.params.edition || !request.params.condition || !request.params.courseName || !request.params.courseTaken || !request.params.notes || !request.params.price) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var book = new Book();
	book.set("user", response.user);
	book.set("name", response.params.name);
	book.set("ISBN", response.params.ISBN);
	book.set("edition", response.params.edition);
	book.set("condition", response.params.condition);
	book.set("courseName", response.params.courseName);
	book.set("courseTaken", response.params.courseTaken);
	book.set("notes", response.params.notes);
	book.set("price", response.params.price);
	book.set("sold", false);
	book.set("numViews", 0);

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