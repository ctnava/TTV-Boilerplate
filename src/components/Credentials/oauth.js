const defaultState = {
    token: "",
    opaque_id: "",
    user_id: undefined,
    isMod: false,
    role: undefined
};


function setToken(tkn, id, setAuth) {
    let token = tkn;
    let opaque_id = id;
    let isMod = false;
    let role = "";
    let user_id = "";

    try {
        let decoded = require('jose').decode(token)
        isMod = (decoded.role === 'broadcaster' || decoded.role === 'moderator');
        user_id = decoded.user_id;
        role = decoded.role;
    } catch {token = ''; opaque_id= '';}
    
    setAuth({token, opaque_id, user_id, isMod, role});
}


const isDefined = (pointer) => {
    return (
        (pointer !== undefined) && 
        (pointer !== null) && 
        (pointer !== false)
    );
};
const loggedIn      = (auth) => {return (auth.opaque_id[0] === 'U' && isDefined(auth.opaque_id))};
const sharedId      = (auth) => {return !!auth.user_id}; // NOT SAFE! Backend Verification Required.
const authenticated = (auth) => {return (isDefined(auth.token) && isDefined(auth.opaque_id))}; 


module.exports = { 
    defaultState, 
    setToken, 

    eval: {
        loggedIn, 
        sharedId,
        authenticated
    }
}


// const getToken = (auth) => {return auth.token};
// const getOpaqueId = (auth) => {return auth.opaque_id};
// const getUserId = (auth) => {return auth.user_id};
// const isModerator = (auth) => {return auth.isMod};
// const getRole = (auth) => {return auth.role};