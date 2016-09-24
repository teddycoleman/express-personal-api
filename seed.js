// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newBook = new db.Book({
	title: "Infinite Jest",
	author: "David Foster Wallace",
	image: "https://images-na.ssl-images-amazon.com/images/I/81a3oM3EcfL.jpg",
	releaseDate: "Feb 1, 1996"
});

newBook.save();