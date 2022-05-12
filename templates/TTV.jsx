import diag from './diag';
import oauth from './Credentials/ttvOauth';

import './styles.css';
import React, { useState, useEffect } from 'react';
import Config from './Config/Config';
import App from "./App/App";


function TTV(props) { diag(twitch, props.type);
    // Basic States
    const [loading, setLoading] = useState(true);

    // TTV Extension, States, & Setup Effects
    var twitch = window.Twitch ? window.Twitch.ext : false;
    const [auth, setAuth] = useState(oauth.states.initial);
    const [theme, setTheme] = useState('light');
    const themeClass = (theme === 'light') ? ('Ext-light') : ('Ext-dark');
    const [visible, setVisible] = useState(true);
    useEffect(() => { 
        if (twitch) {
            twitch.onAuthorized((credentials)=>{
                oauth.set(credentials.token, credentials.userId, setAuth);
                if(loading){
                    // additionalSetup();
                    setLoading(false);
                }
            });
        
            twitch.onContext((context, delta) => { if(delta.includes('theme')) setTheme(context.theme)});

            if (props.type !== "Config") {
                if (props.type !== "LiveConfig") twitch.onVisibilityChanged((visibility, _c) => {setVisible(visibility)});

                twitch.listen('broadcast', (target, contentType, body)=>{
                    twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`);
                    // otherActions(target, contentType, body);
                });

                return twitch.unlisten('broadcast', () => {console.log('successfully unlistened')});
            }
        }
    }, [loading]);


    switch (props.type) {
        case "Config":
            return(<Config 
                type="Static"
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "LiveConfig":
            return(<Config 
                type="Live"
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "Mobile":
            return(<App 
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "Panel":
            return(<App 
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoComponent":
            return(<App 
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoOverlay":
            return(<App 
                type={props.type}
                twitch={twitch}
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