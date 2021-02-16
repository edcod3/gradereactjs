//Express Import & Express App Initialization
const express = require("express");
const app = express();

//Load environment variables from .env file
require("dotenv").config();

//Import Routes
const router = require("./routes");

//Trust Nginx Proxy for secure cookies (Production)
if (process.env.NODE_ENV == "production") {
	app.set("trust proxy", 1);
}

//Disable x-powered-by header
app.disable("x-powered-by");

//Use Routes from ./routes/index.js
//requests to /api/* sent to Router
app.use("/api", router);

//Server Start
var server = app.listen(8000, function () {
	var host = server.address().address;
	var port = 8000;

	console.log("Server started at %s:%s", host, port);
});
