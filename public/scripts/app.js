console.log("Sanity Check: JS is working!");

$(document).ready(function(){

	var allBooks = [];

	var $booksList = $('#books-list');
	var $createBook = $('#create-book');

	var source = $('#books-template').html();
	var template = Handlebars.compile(source);

    function render() {
      // empty existing todos from view
      $booksList.empty();

      // pass `allbooks` into the template function
      var booksHtml = template({ books: allBooks });
      // append html to the view
      $booksList.append(booksHtml);
    };

    //Load info about me on start up 
	$.ajax({
		method: "GET",
		url: "/api/profile/",
		success: function onLoadAllBooks(json){
			var aboutMe = $("<h2> Hi I'm "+json.name+". Check out all my favorite berks!</h2><img src='https://cdn.meme.am/instances/500x/23062589.jpg'>");
			$('h1').append(aboutMe);
		}
	});

	//Load all books on start up 
	$.ajax({
		method: "GET",
		url: "/api/books/",
		success: function onLoadAllBooks(json){
			allBooks = json;
			render();
		}
	});

	$createBook.on("submit",function createNewBook(event){
		event.preventDefault();
		var newBook = $(this).serialize();
		$.ajax({
			method: "POST",
			url: "/api/books",
			data: newBook,
			success: function(json){
				allBooks.push(json);
				render();
			}
		});

	});

	$booksList.on("submit",".update-books",function deleteBook(event){
		event.preventDefault(); 
		var updatedBook = $(this).serialize();
		var bookId = $(this).closest('.books').attr('data-id');

		var bookToUpdate = allBooks.find(function (book) {
			return book._id == bookId;
		});

		$.ajax({
			method: "PUT",
			url: "/api/books/" + bookId, 
			data: updatedBook,
			success: function(json){
				allBooks.splice(allBooks.indexOf(bookToUpdate), 1, json);
				render();
			}
		});
	});

	$booksList.on("click",".delete-books",function deleteBook(event){
		event.preventDefault();
		var bookId = $(this).closest('.books').attr('data-id');
		var bookToUpdate = allBooks.find(function (book) {
			return book._id == bookId;
		});
		$.ajax({
			method: "DELETE",
			url: "/api/books/" + bookId, 
			success: function(json){
				allBooks.splice(allBooks.indexOf(bookToUpdate), 1);
				render();
			}
		});
	});

});
