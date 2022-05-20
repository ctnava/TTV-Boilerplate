const fs = require("fs");
const jose = require("jose");

const pathTo = {
	places: "./temp",
	logs: "./api/logs.json",
	template: "./api/template.json",
	reports: "./api/reports.json",
	env: "./api/env.json",
	legal: "./api/legal.json",
};

function load(path) {
	return JSON.parse(fs.readFileSync(path));
}

function save(path, data) {
	fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

const falsy = ["", {}, 0, false, null, undefined];
const invalidData = (body) => {
	return (
		falsy.includes(body) ||
		falsy.includes(body.auth) ||
		falsy.includes(body.auth.token) ||
		falsy.includes(body.timestamp)
	);
};
const invalidHeader = (headers, auth) => {
	return (
		falsy.includes(headers.authorization) ||
		headers.authorization !== `Bearer ${auth.token}`
	);
};
const invalidToken = (auth) => {
	const decoded = jose.decodeJwt(auth.token);
	const expired = decoded.exp <= decoded.iat;
	const manipulated = decoded.iat > decoded.exp;
	const forged =
		decoded.opaque_user_id !== auth.opaqueId ||
		decoded.role !== auth.role ||
		decoded.channel_id !== auth.channelId;
	if (forged || manipulated) console.log("YOU ARE BEING ATTACKED");
	return expired || forged || manipulated;
};

const invalid = (req, res) => {
	const { body, headers } = req;
	if (invalidData(body)) {
		console.log("INVALID_BODY");
		res.status(422).json("INVALID_BODY");
		return true;
	}
	if (invalidHeader(headers, body.auth) || invalidToken(body.auth)) {
		console.log("INVALID_HEADERS");
		res.status(422).json("INVALID_HEADERS");
		return true;
	} else return false;
};

module.exports = { pathTo, load, save, invalid };
