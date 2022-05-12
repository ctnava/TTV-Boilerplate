import diag from './diag';
import oauth from '../util/ttvOauth';

import React from 'react';
import OAuth from '../util/OAuth';


function Config(props) { diag(props.twitch, props.type, props.loading, props.auth);
    
    return(<div className={`Ext ${props.themeClass}`}>
        <h1>Config - {props.type}</h1>
        <h3>ctnava/TTV-Boilerplate@github</h3><hr/>

        { !props.loading ? (

            props.type === "Live" ? (

                oauth.hasRole.moderator(props.auth) ? (
                    
                    <OAuth auth={props.auth} />
                
                ) : (<p>User not Moderator</p>)

            ) : (<p>Configuration Not Required</p>)

        ) : (<p>Loading...</p>) }
    </div>);
}


export default Config;