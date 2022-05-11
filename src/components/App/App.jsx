import diag from './diag';

import React from 'react';
import OAuth from '../Credentials/OAuthDisplay';


function App(props) { diag(props.twitch, props.loading, props.visible);


    return(<div className={`Ext ${props.themeClass}`}>
        <h1>App Component</h1><hr/>

        {(!props.loading && props.visible) ? (<OAuth auth={props.auth} />) : "Loading..."}
    </div>);
}


export default App;