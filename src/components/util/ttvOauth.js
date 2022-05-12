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

function set(presented, setAuth) {
    var credentials; var now;
    // console.log("PRESENTED: ", presented);
    const validRoles = ["broadcaster", "viewer", "moderator"];
    if (presented.token){
        now = Math.floor(new Date().getTime()/1000);
        const decoded = jose.decodeJwt(presented.token);
        // console.log("DECODED: ", decoded);
        credentials = {
            token: presented.token,
            clientId: presented.clientId,
            channelId: decoded.channel_id, // presented.channelId
            opaqueId: decoded.opaque_user_id, // presented.userId
            userId: decoded.user_id,
            role: decoded.role,
            permissions: decoded.pubsub_perms
        }
        try {
            const badTiming = (decoded.iat > decoded.exp || decoded.exp < now);
            const userIdFailure = (decoded.opaque_user_id !== presented.userId);
            const roleFailure = !validRoles.includes(decoded.role);
            // if (badTiming) console.log("ERROR: @ttvOauth badTiming");
            // if (userIdFailure) console.log("ERROR: @ttvOauth userIdFailure");
            // if (roleFailure) console.log("ERROR: @ttvOauth roleFailure");
            if (badTiming||userIdFailure||roleFailure) throw "@ttvOauth INVALID_CREDENTIALS";
        } catch { // Fire and forget login_failure reports
            // api.req.post("login_failure", {timestamp:now}, presented);
            setAuth(states.invalid); return;
        }
        setAuth(credentials);
    }
}

const unexpectedValues = ["", null, undefined, false, " "];
// user
const isIdentified  = (auth) => {return (!unexpectedValues.includes(auth.userId))};
const isLoggedIn    = (auth) => {return (auth.opaqueId[0] === "U")}

// login
const success       = (auth) => {return (auth !== states.initial)};
const failure       = (auth) => {return (auth !== states.invalid)};

// hasRole
const broadcaster   = (auth) => {return (auth.role === "broadcaster")};
const moderator     = (auth) => {return (broadcaster(auth) || auth.role === "moderator")};


module.exports = { 
    states,

    set, 

    user: {isIdentified, isLoggedIn},
    login: {success, failure},
    hasRole: {broadcaster, moderator}
}