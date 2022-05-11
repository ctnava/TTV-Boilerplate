const oauth = require("./oauth.js");


const defaultState = {'Content-Type':'application/json'};


function authorize(auth) {
    var header = defaultState;
    if (oauth.eval.authenticated(auth)) {
        header['Authorization'] = `Bearer ${auth.token}`;
        return header;
    } else return false;
}


module.exports = { defaultState, authorize };