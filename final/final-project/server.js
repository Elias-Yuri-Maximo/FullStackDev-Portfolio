let express = require('express');
let path = require('path');
let http = require('http');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
// import the routing file to handle the default (index) route
let books = require('./server/routes/books');

mongoose.connect('mongodb://127.0.0.1:27017/bookshelf',
   { useNewUrlParser: true }
).then(
  () => { console.log("success") },
  err => { console.log("error" + err) }
);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use((req, res, next) => {
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

  const port = 3000
  app.use('/books', books);
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port, function() {
    console.log('API running on localhost: ' + port)
  });
  
