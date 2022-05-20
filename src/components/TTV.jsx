import diag from "./util/twitch/diag";
import ttv from "./util/twitch/ext";
import oauth from "./util/twitch/oauth";
import React, { useState, useEffect } from "react";
import App from "./App/App";

function TTV(props) {
	diag.generic(props.type);
	
	// Basic States
	const [loading, setLoading] = useState(true);

	// TTV Extension, States, & Setup Effects
	const [auth, setAuth] = useState(oauth.states.initial);
    const [theme, setTheme] = useState('light');
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		if (!ttv()) return;

		ttv().onAuthorized((credentials) => {
			oauth.set(credentials, setAuth);
			if (!loading) return;
			setLoading(false);
		});
		
		ttv().onVisibilityChanged((visibility, _c) => {
			setVisible(visibility);
		});

        ttv().onContext((context, delta) => { if(delta.includes('theme')) setTheme(context.theme)});
		
		ttv().listen("broadcast", (target, contentType, body) => {
			diag.log(`PubSub:\n${target}\n${contentType}\n${body}`);
			// otherActions(target, contentType, body);
		});

		return ttv().unlisten("broadcast", () => {
			diag.log("successfully unlistened");
		});
	}, [loading]);

	if (loading) return <p className="transition">Connecting to API...</p>;
	else return (<div className={(theme === 'light') ? ('Ext Ext-light') : ('Ext Ext-dark')}>
		<App
			type={props.type}
			visible={visible}
			auth={auth}
		/>
	</div>);
}

export default TTV;
