import React from 'react';
import oauth from './oauth';


function OAuth(props) {
    const idIsShared = oauth.eval.sharedId(props.auth);
    console.log("displaying", props.auth)
    return (<div>

        <h3>TTV USER CREDENTIALS</h3>
        
        <ul>
            <li>channelId: {props.auth.channelId}</li>
            <li>clientId: {props.auth.clientId}</li>
            <li>opaqueId: {props.auth.opaqueId}</li>
            <li>@userId isShared: {idIsShared}</li>
            {idIsShared && (<li>userId: {props.auth.userId}</li>)}
            <li>isModerator: {props.auth.isMod}</li>
        </ul>

        <hr/>

        {props.auth.isMod && (<input value='mod verification button' type='button'/>)}

    </div>);
}


export default OAuth;