const oauth = require("../OAuth/utils.js");


const requestHeader = (auth) => {
    if (oauth.eval.authenticated(auth)) {
        return {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${auth.token}`
        }
    } else return false;
}


module.exports = requestHeader;