const fs = require("fs");
const process = require("process");

(() => {
	if (!fs.existsSync("./.env"))
		fs.writeFileSync(
			"./.env",
			`BACKEND_BASE_URI=http://localhost:4000\nBACKEND_PORT=4000\nBACKEND_SECRET=anythingYouWantReally`
		);

	if (!fs.existsSync("./Project.json")) {
        const clientId = process.argv[2];

        if (clientId === undefined) {
            console.log("\x1b[31m", "\nFirst Time Setup Requires You to Add Your Extension's Client ID as an argument\ne.g. 'node ./util/quickStart.js EXTENSION_ID_HERE'\n");
            return;
        }
        
		var project = JSON.parse(fs.readFileSync("./templates/ttvConfig.json"));
		project.manifest.id = clientId;
		fs.writeFileSync("./Project.json", JSON.stringify(project, null, 2));
		console.log("\x1b[32m", "\nProject File Set Up! Please open the Developer Rig and Add Project >> Open Project >> Project.json @ TTVBoilerplate Root\nOnce linked to your developer rig, click 'Refresh Manifest' on the 'Project Details' Tab.\n");
    }
})();
