import React from 'react';


import OAuth from '../OAuth/OAuth';


function Config(props) {
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