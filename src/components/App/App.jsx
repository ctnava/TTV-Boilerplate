import diag from './diag';

import React from 'react';
import OAuth from '../util/OAuth';


function App(props) { diag(props.twitch, props.type, props.loading, props.visible);

    return(<div className={`Ext ${props.themeClass}`}>
        <h1>App - {props.type}</h1>
        <h3>ctnava/TTV-Boilerplate@github</h3>
        <hr/>

        {(!props.loading && props.visible) ? (<OAuth auth={props.auth} />) : "Loading..."}
    </div>);
}


export default App;