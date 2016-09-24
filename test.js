$.ajax({
	method: "POST",
	url: "/api/books",
	data: {
		title: "1Q84",
		author: "Haruki Murakami",
		image: "https://images-na.ssl-images-amazon.com/images/I/416Zq07EtoL._SY344_BO1,204,203,200_.jpg",
		releaseDate: "May 29, 2009"
	},
	success: function(json){
		console.log(json);
	}
});


$.ajax({
	method: "PUT",
	url: "/api/books/57e5aadb2f133f22b1cc78d3",
	data: {
		image:"https://images-na.ssl-images-amazon.com/images/I/519DLd11sYL._SY344_BO1,204,203,200_.jpg"
	},
	success: function(){
		console.log("it worked!");
	}
});


$.ajax({
	method: "DELETE",
	url: "/api/books/57e5a99dcc0c6b22a6b11612",
	success: function(){
		console.log("it worked!");
	}
});


$.ajax({
	method: "GET",
	url: "/api/books/",
	success: function(){
		console.log("it worked!");
	}
});