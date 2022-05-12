const jose = require("jose");


const defaultState = {
    channelId: "",
    clientId: "",
    opaqueId: "",
    userId: "",
    role: ""
};


function setToken(credentials, setAuth) {
    // console.log("PRESENTED: ", credentials);
    if (credentials.token){
        let token = credentials.token;

        let channelId = credentials.channelId;
        let clientId = credentials.clientId;
        let opaqueId = credentials.userId;
        let userId = "";
        let role = "";
        try {
            let decoded = jose.decodeJwt(token);
            // console.log("DECODED: ", decoded);

            if (
                decoded.iat > decoded.exp || 
                decoded.exp < Math.floor(new Date().getTime()/1000) ||
                decoded.opaque_user_id !== opaqueId || 
                decoded.channel_id !== channelId ||
                decoded.user_id !== channelId
            ) throw "Invalid Credentials";

            userId = decoded.user_id;
            role = decoded.role;
        } catch (e) {console.log("ERROR:", e); userId = ""; role = "LOGIN_FAILURE";}
        setAuth({channelId, clientId, opaqueId, userId, role});
    } else return;
}


const isDefined = (pointer) => {
    return (
        (pointer !== undefined) && 
        (pointer !== null) && 
        (pointer !== false)
    );
};

const isMod         = (auth) => {return (auth.role === "broadcaster" || auth.role === "moderator")};
const loggedIn      = (auth) => {return (auth.opaqueId[0] === 'U' && isDefined(auth.opaqueId))};
const sharedId      = (auth) => {return (auth.userId !== "")}; // NOT SAFE! Backend Verification Required.
const authenticated = (auth) => {return (isDefined(auth.token) && isDefined(auth.opaqueId))}; 
const loginFailed   = (auth) => {return (auth.role === "LOGIN_FAILURE")};


module.exports = { 
    defaultState, 
    setToken, 

    eval: {
        isMod,
        loggedIn, 
        sharedId,
        authenticated,
        loginFailed
    }
}