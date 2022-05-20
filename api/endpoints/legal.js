const { pathTo, load, save, invalid } = require("../utils/utils.js");


// TOS & Privacy Policy Endpoints for Legal Protection as well as (optional) GDPR & CCPA Compliance
const legalEndpoints = (app) => {
    app.route("/legal")
        .get((req, res) => {
            // Allow people to get your Legal Contracts
            res.json(load(pathTo.legal));
        })
        .post((req, res) => {
            // Update your Legal Contracts
            if (req.body.secret !== process.env.BACKEND_SECRET) return;
            const { contract, article, content } = req.body;
            var legal = load(pathTo.legal);
            legal[contract][article] = content;
            save(pathTo.legal, legal);
            res.json(legal);
        });
    // NOTICE: 
    // This method of delivery is rudimentary.
    // Please set this up yourself.

    // CCPA & GDPR Compliance Endpoints
    app.route("/ccpa_gdpr")
	.get((req, res) => {
		const opaqueId = req.headers.opaqueid;
		if (opaqueId === undefined) return;
		const notice =
			"These logs are every recorded incident involving your Opaque ID.";
		const logs = load(pathTo.logs).archive.filter(
			(log) => log.auth.opaqueId === opaqueId
		);
		const reports = load(pathTo.reports).archive.filter(
			(report) => report.auth.userId === opaqueId
		);
		res.json({ notice, logs, reports });
	})
	.post((req, res) => {
		if (invalid(req, res)) return;
		const opaqueId = req.body.auth.opaqueId;
		var archive = load(pathTo.logs).archive.filter(
			(log) => log.auth.opaqueId !== opaqueId
		);
		save(pathTo.logs, {archive});
		archive = load(pathTo.reports).archive.filter(
			(report) => report.auth.userId !== opaqueId
		);
		save(pathTo.reports, {archive});
		res.json("ok");
	});
}


module.exports = legalEndpoints;