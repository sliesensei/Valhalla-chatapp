import {applyRoutes} from "./src/helpers";
import setupSocket from "./src/socket";

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
	useCreateIndex: true,
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
applyRoutes(app);

server.listen(port, function() {
	console.log("Mon serveur fonctionne sur http://localhost:" +port +"\n");
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/msg.html');
});

setupSocket(io);

module.exports = app;
