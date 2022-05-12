const jose = require("jose");
const api = require("./api.js");


const states = {
    initial: {
        token: "",
        channelId: "",
        clientId: "",
        opaqueId: "",
        userId: "",
        role: "",
        permissions: ""
    },
    invalid: {
        token: "LOGIN_FAILURE",
        channelId: "LOGIN_FAILURE",
        clientId: "LOGIN_FAILURE",
        opaqueId: "LOGIN_FAILURE",
        userId: "LOGIN_FAILURE",
        role: "LOGIN_FAILURE",
        permissions: "LOGIN_FAILURE"
    }
};

const validRoles = ["broadcaster", "viewer", "moderator"];
const unexpectedValues = ["", null, undefined, false, " "];

function set(presented, setAuth) {
    var credentials; var now;
    // console.log("PRESENTED: ", presented);
    if (presented.token){
        try {
            now = Math.floor(new Date().getTime()/1000);
            const decoded = jose.decodeJwt(presented.token);
            // console.log("DECODED: ", decoded);
            if (
                // BAD TIMING
                decoded.iat > decoded.exp || 
                decoded.exp < now || 
                // CREDENTIAL MISMATCH
                decoded.opaque_user_id !== presented.opaqueId || 
                decoded.channel_id !== presented.channelId || 
                // DECODE FAILURE @ USER ID
                decoded.user_id !== presented.channelId || 
                unexpectedValues.includes(decoded.user_id) || 
                // DECODE FAILURE @ ROLE
                !validRoles.includes(decoded.role)
            ) throw "INVALID_CREDENTIALS";
            
            credentials = {
                token: presented.token,
                clientId: presented.clientId,
                channelId: decoded.channel_id,
                opaqueId: decoded.opaque_user_id,
                userId: decoded.user_id,
                role: decoded.role,
                permissions: decoded.pubsub_perms
            }

        } catch (e) {
            console.log("ERROR:", e); 
            // Fire and forget bad reports
            api.req.post("login_failure", {timestamp:now}, presented);
            setAuth(states.invalid); 
            return;
        }

        setAuth(credentials);
    }
}

// login
const success       = (auth) => {return (auth !== states.initial)};
const failure       = (auth) => {return (auth !== states.invalid)};

// hasRole
const broadcaster   = (auth) => {return (auth.role === "broadcaster")};
const moderator     = (auth) => {return (isBroadcaster(auth) || auth.role === "moderator")};


module.exports = { 
    states,

    set, 
    login: {success, failure},
    hasRole: {broadcaster, moderator}
}