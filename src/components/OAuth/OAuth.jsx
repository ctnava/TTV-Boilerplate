import React from 'react';
import oauth from './utils';


function OAuth(props) {
    const idIsShared = oauth.eval.sharedId(props.auth);
    return (<div>

        <h3>TTV USER CREDENTIALS</h3>
        
        <ul>
            <li>token: {props.auth.token}</li>
            <li>opaque_id: {props.auth.opaque_id}</li>
            <li>user_id_shared: {idIsShared}</li>
            {idIsShared && (<li>user_id: {props.auth.user_id}</li>)}
            <li>isModerator: {props.auth.isMod}</li>
        </ul>

        <hr/>

        {props.auth.isMod && (<input value='mod verification button' type='button'/>)}

    </div>);
}


export default OAuth;