const oauth = require("./oauth.js");


const basic = {'Content-Type':'application/json'};


function authorize(auth) {
    var header = defaultHeader;
    if (oauth.eval.authenticated(auth)) {
        header['Authorization'] = `Bearer ${auth.token}`;
        return header;
    } else return false;
}


module.exports = { basic, authorize };