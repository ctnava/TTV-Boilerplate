import React, { useState, useEffect } from 'react';
import oauth from './OAuth/utils';
import ttv from './utils';
import './resources/styles.css';


import { Routes, Route, BrowserRouter } from "react-router-dom";
import Config from './Config/Config';
import App from "./App/App";


function TTV(props) {
    var twitch = window.Twitch ? window.Twitch.ext : null;
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(oauth.defaultState);
    const [theme, setTheme] = useState('light');
    const themeClass = (theme === 'light') ? ('Ext-light') : ('Ext-dark');
    const [visible, setVisible] = useState(true);


    useEffect(() => {
        if (twitch) {
            ttv.authorize(twitch, setAuth, loading, setLoading);
            ttv.updateContext(twitch, setTheme);
            if (props.type !== "Config") {
                if (props.type !== "LiveConfig") ttv.updateVisibility(twitch, setVisible);
                ttv.listen(twitch);
                return ttv.unmount(twitch);
            }
        }
    }, [loading]);


    return(<BrowserRouter><Routes>
        <Route 
        path="/config" 
        element={
            <Config 
                type="static"
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />} 
        />
        <Route 
        path="/live_config" 
        element={
            <Config 
                type="live"
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />} 
        />
        <Route 
        path="/mobile" 
        element={
            <App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />} 
        />
        <Route 
        path="/panel" 
        element={
            <App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />} 
        />
        <Route 
        path="/video_component" 
        element={
            <App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />} 
        />
        <Route 
        path="/video_overlay" 
        element={
            <App 
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />} 
        />
    </Routes></BrowserRouter>);
}


export default TTV;