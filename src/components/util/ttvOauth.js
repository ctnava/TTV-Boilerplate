import * as jose from "jose";
import api from "./api.js";
const fail = "LOGIN_FAILURE";


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
        token: fail,
        channelId: fail,
        clientId: fail,
        opaqueId: fail,
        userId: fail,
        role: fail,
        permissions: fail
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
            const badTiming = (decoded.exp < now);
            if (badTiming) throw "expired";
            const roleFailure = !validRoles.includes(decoded.role);
            if (roleFailure) throw "invalid";
            const userIdFailure = (decoded.opaque_user_id !== presented.userId);
            if (userIdFailure) throw "forgery";
            const manipulatedToken = (decoded.iat > decoded.exp);
            if (manipulatedToken) throw "manipulation";
        } catch (e) {
            if (e === "forgery" || e === "manipulation")
                api.req.post("bad_actor", {timestamp:now,reportType:e}, presented);
            setAuth(states.invalid); 
            return;
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


export default { 
    states,

    set, 

    user: {isIdentified, isLoggedIn},
    login: {success, failure},
    hasRole: {broadcaster, moderator}
}