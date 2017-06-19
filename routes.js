var express = require('express');

var router = express.Router();

var todoItems = 
[
	{id: 1, desc: 'foo'},
	{id: 2, desc: 'bar'},
	{id: 3, desc: 'baz'}
];

router.get('/', function(req, res) {
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


router.post('/add', function(req, res) {
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

module.exports = router;
    // express way to get some object of a component exposed to outside use