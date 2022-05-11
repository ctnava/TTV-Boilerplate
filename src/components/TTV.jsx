import React, { useState, useEffect } from 'react';
import oauth from './OAuth/utils';
import ttv from './utils';
import './resources/styles.css';


import Config from './Config/Config';
import App from "./App/App";


function TTV(props) {
    var twitch = window.Twitch ? window.Twitch.ext : null;
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(oauth.defaultState);
    const [theme, setTheme] = useState('light');
    const themeClass = (theme === 'light') ? ('Ext-light') : ('Ext-dark');
    
    // ONLY APP
    const [visible, setVisible] = useState(true);
    if (props.type === "Config") {
        useEffect(() => {
            if (twitch) {
                ttv.authorize(twitch, setAuth, loading, setLoading);
                ttv.updateContext(twitch, setTheme);
            }
        }, [loading]);

    } else if (props.type === "LiveConfig") {
        useEffect(() => {
            if (twitch) {
                ttv.authorize(twitch, setAuth, loading, setLoading);
                ttv.updateContext(twitch, setTheme);
                ttv.listen(twitch);
                return ttv.unmount(twitch);
            }
        }, [loading]);

    } else {
        useEffect(() => {
            if (twitch){
                ttv.authorize(twitch, setAuth, loading, setLoading);
                ttv.updateContext(twitch, setTheme);
                ttv.updateVisibility(twitch, setVisible);
                ttv.listen(twitch);
                return ttv.unmount(twitch);
            }
        }, [loading]);
    }

    if (twitch) twitch.log(`Returning ${props.type}`);
    switch (props.type) {
        case "Config":
            return(<Config 
                type="static"
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "LiveConfig":
            return(<Config 
                type="live"
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "Mobile":
            return(<App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "Panel":
            return(<App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoComponent":
            return(<App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoOverlay":
            return(<App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        default:
            return(<div>INVALID EXTENSION TYPE</div>);
    }
}


export default TTV;