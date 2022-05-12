import diag from './diag';
import ouath from '../Credentials/oauth';

import React from 'react';
import OAuth from '../Credentials/OAuthDisplay';


function Config(props) { diag(props.twitch, props.type, props.loading, props.auth);
    
    return(<div className={`Ext ${props.themeClass}`}>
        <h1>Config - {props.type}</h1><hr/>

        { !props.loading ? (

            props.type === "Live" ? (

                ouath.eval.isMod(props.auth) ? (
                    
                    <OAuth auth={props.auth} />
                
                ) : (<p>User not Moderator</p>)

            ) : (<p>Configuration Not Required</p>)

        ) : (<p>Loading...</p>) }
    </div>);
}


export default Config;