const setup = require("./utils/setup");
const legalEndpoints = require("./endpoints/legal");
const defensiveEndpoints = require("./endpoints/defensive");

const app = setup();
legalEndpoints(app);
defensiveEndpoints(app);

const { pathTo, load, save, invalid } = require("./utils/utils.js");
const defaultArchive = { archive: [] };
// CUSTOM ENDPOINTS BELOW THIS LINE
