import React from 'react';


import OAuth from '../OAuth/OAuth';


function Config(props) {
    const loaded = props.type === "live" ? !props.loading : (!props.loading && props.auth.isMod)
    return(<div className={`Ext ${props.themeClass}`}>
        
        { loaded ? (<div>

            <h1>Config Component - {props.type}</h1>
            
            <hr/>

            {props.type === "live" ? (

                <OAuth auth={props.auth} />

            ) : (<p>Configuration Not Required</p>)}

        </div>) : "Loading..."}

    </div>);
}


export default Config;