import axios from "axios";
import standardized from "./std";
import endpoint from "./endpoint";


function addOptions(options, opts) {
    if (typeof opts === typeof options) return {...options, ...opts};
    else return options;
}


async function post(route, rawData, auth, opts) {
    const [url, data, headers] = standardized.input(route, rawData, auth);

    var options = {headers};
    if (opts) addOptions(options, opts);
    const res = await axios.post(url, data, options);
    return res;
}


async function get(route, auth, opts) {
    const url = endpoint(route);
    const headers = standardized.header(auth);

    var options = {headers};
    if (opts) addOptions(options, opts);
    const res = await axios.get(url, options);
    return res;
}


async function put(route, rawData, auth, opts) {
    const [url, data, headers] = standardized.input(route, rawData, auth);

    var options = {data, headers};
    if (opts) addOptions(options, opts);
    const res = await axios.put(url, options);
    return res;
}

async function patch(route, rawData, auth, opts) {
    const [url, data, headers] = standardized.input(route, rawData, auth);

    var options = {data, headers};
    if (opts) addOptions(options, opts);
    const res = await axios.patch(url, options);
    return res;
}

async function del(route, rawData, auth, opts) {
    const [url, data, headers] = standardized.input(route, rawData, auth);

    var options = {data, headers};
    if (opts) addOptions(options, opts);
    const res = await axios.delete(url, options);
    return res;
}


export default { post, get, put, patch, del };