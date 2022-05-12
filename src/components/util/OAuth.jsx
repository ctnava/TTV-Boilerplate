import React from 'react';
import oauth from './ttvOauth';


function OAuth(props) {
    // console.log("displaying", props.auth)
    return (<div>

        <h3>TTV USER CREDENTIALS</h3>
        
        <ul>
            <li>channelId: {props.auth.channelId}</li>
            <li>clientId: {props.auth.clientId}</li>
            <li>opaqueId: {props.auth.opaqueId}</li>
            <li>userId: {props.auth.userId}</li>
            <li>role: {props.auth.role}</li>
        </ul>

        <hr/>

        {oauth.hasRole.moderator(props.auth) && (<input value='mod verification button' type='button'/>)}

    </div>);
}


export default OAuth;