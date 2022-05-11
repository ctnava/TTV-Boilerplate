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

const loggedIn = (auth) => {return auth.opaque_id[0] === 'U'};

// similar to mod status, this isn't always verifiable, so have your backend verify before proceeding. 
const sharedId = (auth) => {return !!auth.user_id};

// checks to ensure there is a valid token in the state
const authenticated = (auth) => {
    const { defined } = require("../resources/utils");
    return (defined(auth.token) && defined(auth.opaque_id));
}; 


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