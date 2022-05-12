import base from "./base";
import endpoint from "./endpoint";


const header = (auth) => {
    var stdHeader = base.header;
    stdHeader['Authorization'] = `Bearer ${auth.token}`;
    return stdHeader;
}

const data = (rawData, auth) => {
    const falsy = [false, "", 0, null, undefined];
    if (falsy.includes(rawData.auth)) rawData.auth = auth;
    if (falsy.includes(rawData.timestamp)) {
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


export default { header, data, input };