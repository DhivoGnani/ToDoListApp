var express = require('express'),
    app = express(),
    session = require('express-session');
var path = require('path')
	
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

var db = null; // global variable to hold the connection

MongoClient.connect('<mongodb>', function(err,database) {
    db = database; // once connected, assign the connection to the global variable
})

app.use(express.static(path.join(__dirname, 'Public')));

app.use(session({
    secret: '<secret>',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "Dhivo" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.get('/', function(req, res){
    res.sendfile('index.html');
});

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "Dhivo" || req.query.password === "dhivopassword") {
    req.session.user = "Dhivo";
    req.session.admin = true;
    res.sendfile("todolist.html");
  }
});

// Get todolist endpoint
app.get('/todolist', auth, function (req, res) {
    res.sendfile("todolist.html");
});

// Get to do list items
app.get('/todoitems', auth, function (req, res) {
  db.collection('todocollection', function (err, collection) {
  	collection.find({username:req.session.user}).toArray(function(err, items) {
  		if(err) throw err;    
  		res.send(items);            
  	});
	});
});

app.post('/todoitems', auth, function(req, res) {
  var newItem = req.body;
  newItem.username = req.session.user;
  db.collection('todocollection', function (err, collection) {
    collection.insert(req.body, function(err, items) {
      if(err) throw err;    
      res.send(items);            
    });
  });
})
 
app.patch('/todoitems', auth, function(req,res) {
  var updateObject = req.body;
  var id = req.query.id;
  db.collection('todocollection', function (err, collection) {
    collection.update({_id:ObjectId(id)}, { $set: updateObject }, function(err, items) {
      if(err) throw err;    
      res.send(items);            
    });
  });
})

app.delete('/todoitems', auth, function(req, res){
  var id = req.query.id;
  db.collection('todocollection', function (err, collection) {
    collection.remove({_id:ObjectId(id)}, function(err, items) {
      if(err) throw err;    
      res.send(items);            
    });
  });
})

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.get('/test', function (req, res) {
  db.collection('usercollection', function (err, collection) {
	 collection.find().toArray(function(err, items) {
		if(err) throw err;    
		res.send(items);            
	});
    });
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");