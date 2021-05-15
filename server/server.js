import routeUsers from './src/routes/routeUsers';
import routeLogin from './src/routes/routeLogin';
import routeConfirmation from "./src/routes/routeConfirmation";
import routeRooms from "./src/routes/routeRooms";

const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

var port = 8080;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const options = {
	useNewUrlParser: true
};

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
routeConfirmation(app);
routeRooms(app);

server.listen(port, function() {
	console.log("Mon serveur fonctionne sur http://localhost:" +port +"\n");
});

/*
app.route('/')
.get(function(req, res) {
	res.status(200).json();
});
*/

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/msg.html');
});

io.on('connection', (socket) => {

});

module.exports = app;
