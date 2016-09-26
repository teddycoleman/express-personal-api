// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/teddycoleman/express-personal-api/README.md",
    baseUrl: "https://young-island-98436.herokuapp.com/", 
    endpoints: [
      {method: "GET", 
        path: "/api", 
        description: "Describes all available endpoints", 
        produces: ["application/json"], 
        "responses":{
          "200":{
            description:"a list of books", "schema":{
              type:"object"}
          }
        }
      },
      {method: "GET", 
        path: "/api/profile", 
        description: "Grabs information for my profile", 
        produces: ["application/json"], 
        "responses":{
          "200":{
            description:"information about me", "schema":{
              type:"object"}
          }
        }
      }, 
      {method: "POST", 
        path: "/api/books", 
        description: "Create a new favorite book",
        produces: ["application/json"], 
        "responses":{
          "200":{
            description:"new book added", "schema":{
              type:"object"}
          }
        }
      },
      {method: "POST", 
        path: "/api/books/:id", 
        description: "Update an existing favorite book",
        produces: ["application/json"], 
        "responses":{
          "200":{
            description:"update existing book", "schema":{
              type:"object"}
          }
        }
      },
      {method: "DELETE", 
        path: "/api/books/:id", 
        description: "Delete an existing favorite book",
        produces: "204", 
        "responses":{
          "200":{
            description:"delete existing book", "schema":{
              type:"object"}
          }
        }
      } 
    ]
  })
});

/*
 * Profile Endpoint
 */

app.get('/api/profile', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    name: "Teddy Coleman",
    gitHubLink: "https://github.com/teddycoleman",
    githubProfileImage: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/070/247/2138349.jpg",
    personalSiteLink: "https://www.linkedin.com/in/teddy-coleman-1328999a",
    currentCity: "San Francisco",
    pets: "Can't wait to get a dog!"
  })
});

/*
 * Books Endpoint
 */

//Index api
app.get('/api/books', function(request,response){
  db.Book.find({}, function(err,books){
    response.send(books);
  });
});

//Show api
app.get('/api/books/:id', function(request,response){
  db.Book.findOne({_id: request.params.id}, function(err,book){
    response.send(book);
  });
});

//Create api
app.post('/api/books/', function(request,response){
  console.log(request.body);
  var newBook = new db.Book({
    title: request.body.title,
    author: request.body.author,
    image: request.body.image,
    releaseDate: request.body.releaseDate
  });
  newBook.save();
  response.send(newBook);
});

//Update api
app.put('/api/books/:id', function(request,response){
  db.Book.findOne({_id: request.params.id}, function(err,book){
    book.title = request.body.title || book.title;
    book.author = request.body.author || book.author;
    book.image = request.body.image || book.image;
    book.releaseDate = request.body.releaseDate || book.releaseDate;
    book.save(function(err,book){
      response.send(book);
    })
  });
});

//Delete api
app.delete('/api/books/:id', function(request,response){
  db.Book.findOneAndRemove({_id: request.params.id}, function(err,book){
    if(err){console.log(err)};
  });
  response.send(204);
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
