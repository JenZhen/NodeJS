// this serves as the "main" of the node application
// start by $node app.js


// below is a js core functionality to use http 
// var http = require('http');
// http.createServer(function(req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.end('Hello world\n');
// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');

var express = require('express'); // load in run time; make sure module is installed
var path = require('path'); // no need to intstall, it's a core js module
var bodyParser = require('body-parser');
var app = express();
// app this object is a function 
// implement a web server that can listen and request to some port
// so that it would respond -- render views/images/talk to db

// config app
// config view engine
app.set('view engine', 'ejs');
						 // ejs like jade needs to be install
app.set('views', path.join(__dirname, 'views'));
							// __dirname refers to current directory,
							// join with views makes it './views'
							// here module path needs to be required as well

// use middleware
// app.use() use() method is to register middleware with express application so that we could use middleware
app.use(bodyParser()); //middleware install and required; used as function as documentation says

app.use(express.static(path.join(__dirname, 'bower_components')));
				  // static is the only express itself middleware -- meaning no npm intall requrie needed
				  // with static: in index when refers to css or fonts or js it can be auto retrieved
				  // this static methods make such directory defualt, no routing to it needed

// define routes

// freq used http methods : get, post, put, del
// url can use regex 
var todoItems = 
[
	{id: 1, desc: 'foo'},
	{id: 2, desc: 'bar'},
	{id: 3, desc: 'baz'}
];

app.get('/', function(req, res) {
	// when a client/browser uses http method 'get' on url '/'
	// we respond with function(req, res)
	// res.send('hello express!');
			// send: send the reposne back to client
	res.render('index', {
		// can send some data to the page
		title: 'My App',
		items: todoItems
	});  
});


app.post('/add', function(req, res) {
	var newItem = req.body.newItem; 
						// req.body needs middleware to parse request body
						// check expressjs official site saying it's not a middleware
						// turn out to be a npm package so install and require here
	console.log(newItem);
	todoItems.push({
		id: todoItems.length + 1,
		desc: newItem
	});
	res.redirect('/');
			// res.redirect('/') send the request url '/' at the end;
});

// when routes are getting more complicated can move to a different module
// and replace all above defined routes to 
// app.use(require('./router'));
// can also do: app.use('/api', require('./router'));
// 					      // means router are exported for /api only 
						  // route defined in router get('/add') will auto changed to '/api/add'
// start web app server
app.listen(1337, function() {
//listen is a function, 1337 is the port# (one of the para), function() is the function parameter
	console.log('Ready on port 1337');
});


