const defaultState = {
    token: "",
    opaqueId: "",
    isMod: false,
    channelId: "",
    clientId: "",
    userId: "",
    role: ""
};


function setToken(credentials, setAuth) {
    if (credentials.token){
        let token = credentials.token;
        let opaqueId = credentials.userId;
        let isMod = false;
        let channelId = credentials.channelId;
        let clientId = credentials.clientId;
        let userId = "";
        let role = "";
        try {
            console.log(credentials);
            let decoded = require('jose').decode(token);
            console.log(decoded);
            isMod = (decoded.role === 'broadcaster' || decoded.role === 'moderator');
            userId = decoded.userId;
            role = decoded.role;
        } catch {token = ''; opaqueId= '';}
        setAuth({token, opaqueId, isMod, channelId, clientId, userId, role});
    } else return defaultState;
}


const isDefined = (pointer) => {
    return (
        (pointer !== undefined) && 
        (pointer !== null) && 
        (pointer !== false)
    );
};
const loggedIn      = (auth) => {return (auth.opaqueId[0] === 'U' && isDefined(auth.opaqueId))};
const sharedId      = (auth) => {return !!auth.userId}; // NOT SAFE! Backend Verification Required.
const authenticated = (auth) => {return (isDefined(auth.token) && isDefined(auth.opaqueId))}; 


module.exports = { 
    defaultState, 
    setToken, 

    eval: {
        loggedIn, 
        sharedId,
        authenticated
    }
}