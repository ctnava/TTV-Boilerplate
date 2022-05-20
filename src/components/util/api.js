import axios from "axios";

const primaryInput = (route, auth) => {
	return {
		url: `${process.env.BACKEND_BASE_URI}/${route}`,
		rawHeaders: {
			"content-type": "application/json",
			authorization: `Bearer ${auth.token}`,
		},
	};
};

const modifiedData = (data, auth) => {
	if (data.auth === undefined) data.auth = auth;
	if (data.timestamp === undefined)
		data.timestamp = Math.floor(new Date().getTime() / 1000);
	return data;
};

const modifiedHeaders = (rawHeaders, opts) => {
	if (opts === undefined) return rawHeaders;
	return { ...rawHeaders, ...opts };
};

// CREATE
async function post(route, auth, data, opts) {
	const { url, rawHeaders } = primaryInput(route, auth);
	const body = modifiedData(data, auth);
	const headers = modifiedHeaders(rawHeaders, opts);
	const res = await axios.post(url, body, { headers });
	return res;
}

// READ
async function get(route, auth, opts) {
	const { url, rawHeaders } = primaryInput(route, auth);
	const headers = modifiedHeaders(rawHeaders, { ...opts });
	const res = await axios.get(url, { headers });
	return res;
}

// UPDATE
async function put(route, auth, rawData, opts) {
	const { url, rawHeaders } = primaryInput(route, auth);
	const data = modifiedData(rawData, auth);
	const headers = modifiedHeaders(rawHeaders, { ...opts, data });
	const res = await axios.put(url, { headers });
	return res;
}

// UPDATE
async function patch(route, auth, rawData, opts) {
	const { url, rawHeaders } = primaryInput(route, auth);
	const data = modifiedData(rawData, auth);
	const headers = modifiedHeaders(rawHeaders, { ...opts, data });
	const res = await axios.patch(url, { headers });
	return res;
}

// DESTROY
async function del(route, auth, rawData, opts) {
	const { url, rawHeaders } = primaryInput(route, auth);
	const data = modifiedData(rawData, auth);
	const headers = modifiedHeaders(rawHeaders, { ...opts, data });
	const res = await axios.delete(url, { headers });
	return res;
}

export default { post, get, put, patch, del };
