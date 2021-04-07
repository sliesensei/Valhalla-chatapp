import routeUsers from './src/routes/routeUsers';
import routeLogin from './src/routes/routeLogin';

const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const passport = require('passport');

var port = 8080;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const options = {
	useNewUrlParser: true
};

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({	extended: true}));
app.use(bodyParser.json());

const connectWithRetry = () => {
	console.log('MongoDB connection with retry');
	mongoose.connect(config.DBHost, options).then(() => {
	  console.log('MongoDB is connected');
	}).catch((err) => {
	  console.log(`MongoDB connection unsuccessful to ${config.DBHost}, retry after 5 seconds.`);
	  setTimeout(connectWithRetry, 5000);
	});
};

connectWithRetry();
routeUsers(app);
routeLogin(app);

app.listen(port, function() {
	console.log("Mon serveur fonctionne sur http://localhost:" +port +"\n");
});

app.route('/')
.get(function(req, res) {
	res.status(200).json();
});

module.exports = app;
