const { pathTo, load, save, invalid } = require("../utils/utils.js");


// BASIC LOGGING
const defensiveEndpoints = (app) => {
	app.route("/bad_actor")
    .post((req, res) => {
		if (invalid(req, res)) return;
		const { body } = req;
		if (!body.reportType) {
			res.status(422).json("INVALID_REPORT");
			return;
		}

		var reports = defaultArchive;
		if (fs.existsSync(pathTo.reports)) reports = load(pathTo.reports);
		var report = body;
		report.ip = req.ip;

		var present = false;
		reports.archive.forEach((item) => {
			const ts = item.timestamp === report.timestamp;
			const rt = item.reportType === report.reportType;
			const ad = item.ip === report.ip;
			const ui = item.auth.userId === report.auth.userId;
			const ci = item.auth.channelId === report.auth.channelId;
			const st = item.auth.token === report.auth.token;
			if (ts && rt && ad && ui && ci && st) present = true;
		});

		if (!present) {
			reports.archive.push(report);
			save(pathTo.reports, reports);
		}

		res.json("ok");
	});
};


module.exports = defensiveEndpoints;
