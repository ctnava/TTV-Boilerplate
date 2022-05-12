const base = require("./base");
const endpoint = require("./endpoint");


const header = (auth) => {
    var stdHeader = base.header;
    stdHeader['Authorization'] = `Bearer ${auth.token}`;
    return stdHeader;
}

const data = (rawData, auth) => {
    rawData.auth = auth;

    const invVals = [false, "", 0, null, undefined];
    if (invVals.includes(rawData.timestamp)) {
        const now = Math.floor(new Date().getTime()/1000);
        rawData.timestamp = now;
    }
    
    return rawData;
};

const input = (route, rawData, auth) => {
    const url = endpoint(route);
    const stdData = data(rawData, auth);
    const stdHeaders = header(auth);
    return [url, stdData, stdHeaders];
}


module.exports = { header, data, input }