const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars")
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const config = require('./config/config.js')();

// const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, function(err, client) {
  	if(err){
  		console.log("something bad happen while connection DB")
  	}

  	global.db = client.db("aranya");
  	console.log("Connected successfully to DB");
	// app.use('/public', express.static(path.join(__dirname, './public')));
	// app.use('/public', express.static(path.join(__dirname, './public/img')));

	app.use(express.static('public'));
	app.use(express.static('public/img')); 

	app.set('views', path.join(__dirname, './views'));

	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		extname: '.hbs'
			}));

	app.set('view engine', '.hbs');

	require('./controllers/indexController.js')(app);
	require('./controllers/productsController.js')(app)
	require('./controllers/cartController.js')(app);;


	app.listen(config.port, function(){
    	console.log('Server listening on port ' + config.port);
	});

	// app.listen(port, (err) => {
	// 	if (err) {
	// 		console.log("Something bad happen")
	// 	}
	// 	console.log(`App listening on port ${port}`)
	// })
})  
