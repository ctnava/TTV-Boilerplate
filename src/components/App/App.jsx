import React from 'react';


function App(props) {
    return(<div className={`Ext ${props.themeClass}`}>
        {(!props.loading && props.visible) ? (<div>
        
            <h1>App Component</h1>
            
            <hr/>

            <OAuth auth={props.auth} />
        
        </div>) : "Loading..."}
    </div>);
}


export default App;