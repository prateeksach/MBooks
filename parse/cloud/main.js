// Require modules
var _ = require('underscore');

// Parse Objects
var Book = Parse.Object.extend("Book");
var Feedback = Parse.Object.extend("Feedback");

// Get recent books posted
Parse.Cloud.define("recentBooks", function(request, response) {
	var query = new Parse.Query(Book);
	query.equalTo("sold", false);
	query.addDescending("updatedAt");
	query.include("user");
	query.limit(30);

	if(request.params.skip)
		query.skip(request.params.skip)

	query.find({
		useMasterKey: true,
		success: function(list) {
			for(var index = 0; index < list.length; index++) {
				list[index].attributes.user = list[index].get("user").get("email");
			}

			response.success(list);
		},
		error: function(error) {
			response.error(error);
		}
	})
});

// Increment number of views
Parse.Cloud.define("incrementViews", function(request, response) {
	if(!request.params.bookId) {
		response.error("Error: Invalid parameters.");
		return;
	}

	var query = new Parse.Query(Book);
	query.equalTo("objectId", request.params.bookId);

	query.first({
		useMasterKey: true,
		success: function(book) {
			book.set("numViews", book.get("numViews") + 1);
			book.save(null, {
				useMasterKey: true,
				success: function() {
					response.success();
				},
				error: function(error) {
					response.error(error);
				}
			})
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
	query.include("user");
	query.limit(30);

	if(request.params.skip)
		query.skip(request.params.skip)

	query.find({
		useMasterKey: true,
		success: function(list) {
			for(var index = 0; index < list.length; index++) {
				list[index].attributes.user = list[index].get("user").get("email");
			}

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

// Save a book
Parse.Cloud.define("saveBook", function(request, response) {
	if(!request.user) {
		response.error("Error: Invalid User");
		return;
	} else if(!request.params.editId || !request.params.bookName || !request.params.ISBN || !request.params.edition || !request.params.condition || !request.params.courseName || !request.params.courseTaken || !request.params.price) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var book = new Book({objectId: request.params.editId});
	book.fetch({
		useMasterKey: true,
		success: function() {
			if(!book.get("user") || book.get("user").id != request.user.id) {
				response.error("Error: Breach attempt.");
				return;
			}

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
		},
		error: function(error) {
			response.error(error);
		}
	});
});

// Save Feedback
Parse.Cloud.define("saveFeedback", function(request, response) {
	if(!request.params.notes) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var feedback = new Feedback();
	feedback.set("notes", request.params.notes);
	if(request.params.email)
		feedback.set("email", request.params.email);
	if(request.user)
		feedback.set("user", request.user);

	feedback.save(null, {
		useMasterKey: true,
		success: function() {
			response.success();
		},
		error: function(error) {
			response.error(error);
		}
	})
});

// Mark a book as sold
Parse.Cloud.define("markAsSold", function(request, response) {
	if(!request.user) {
		response.error("Error: Invalid User");
		return;
	} else if(!request.params.bookId) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var book = new Book({objectId: request.params.bookId});
	book.fetch({
		useMasterKey: true,
		success: function() {
			console.log(book);
			if(!book.get("user") || book.get("user").id != request.user.id) {
				response.error("Error: Breach attempt.");
				return;
			}

			book.set("sold", true);
			book.save(null, {
				useMasterKey: true,
				success: function() {
					response.success(book);
				},
				error: function(error) {
					response.error(error);
				}
			})
		},
		error: function(error) {
			response.error(error);
		}
	});
});

// Re list a book
Parse.Cloud.define("markAsUnsold", function(request, response) {
	if(!request.user) {
		response.error("Error: Invalid User");
		return;
	} else if(!request.params.bookId) {
		response.error("Error: Invalid Parameters");
		return;
	}

	var book = new Book({objectId: request.params.bookId});
	book.fetch({
		useMasterKey: true,
		success: function() {
			if(!book.get("user") || book.get("user").id != request.user.id) {
				response.error("Error: Breach attempt.");
				return;
			}

			book.set("sold", false);
			book.save(null, {
				useMasterKey: true,
				success: function() {
					response.success(book);
				},
				error: function(error) {
					response.error(error);
				}
			})
		},
		error: function(error) {
			response.error(error);
		}
	});
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