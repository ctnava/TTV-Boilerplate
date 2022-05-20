require("dotenv").config();
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pathTo, load } = require("./utils.js");

function initDirs() {
	if (!fs.existsSync(pathTo.places)) fs.mkdirSync(pathTo.places);
}

function setup() {
	initDirs();
	const app = express();
	app.use(bodyParser.json());
	app.use("/temp", express.static("temp"));

	const projectConfig = load("./Project.json");
	const hostedTestUrl = `https://${projectConfig.manifest.id}.ext-twitch.tv`;
	const devrigUrl = "https://localhost:8080";
	const origin = process.env.PORT ? hostedTestUrl : devrigUrl;
	app.use(cors({ origin }));

	const port = process.env.PORT ? process.env.PORT : process.env.BACKEND_PORT;
	app.listen(port, () => {
		console.log("Server Started on Port:" + port);
	});

    // Sanity Check Route
	app.get("/", (req, res) => {
		res.json("Hello World!");
	});

	return app;
}

module.exports = setup;
