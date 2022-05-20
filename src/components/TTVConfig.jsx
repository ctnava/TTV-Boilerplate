import diag from "./util/twitch/diag";
import ttv from "./util/twitch/ext";
import oauth from "./util/twitch/oauth";
import React, { useState, useEffect } from "react";
import Config from "./Config/Config";

function TTVConfig(props) {
	diag.generic(props.type);

	// Basic States
	const [loading, setLoading] = useState(true);

	// TTV Extension, States, & Setup Effects
	const [auth, setAuth] = useState(oauth.states.initial);
    const [theme, setTheme] = useState('light');
	useEffect(() => {
		if (!ttv()) return;
		ttv().onAuthorized((credentials) => {
			oauth.set(credentials, setAuth);
			if (!loading) return;
			// additionalSetup();
			setLoading(false);
		});

		ttv().onContext((context, delta) => { if(delta.includes('theme')) setTheme(context.theme)});

		if (props.type === "Config") return;

		ttv().listen("broadcast", (target, contentType, body) => {
			diag.log(`PubSub:\n${target}\n${contentType}\n${body}`);
			// otherActions(target, contentType, body);
		});

		return ttv().unlisten("broadcast", () => {
			diag.log("successfully unlistened");
		});
	}, [loading]);

	if (loading) {return <p className="transition">Loading...</p>}
	else return (<div className={(theme === 'light') ? ('Ext Ext-light') : ('Ext Ext-dark')}>
		{props.type === "Config" ? (
			<Config type="Static" auth={auth} />
		) : (
			<Config type="Live" auth={auth} />
		)}
	</div>);
}

export default TTVConfig;
