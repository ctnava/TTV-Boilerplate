import React from "react";
import RequestPanel from "./components/RequestPanel";

function Config(props) {
	return (
		<div className="Ext">
			<h1>Config - {props.type}</h1>
			<hr />
			{props.auth.role === "moderator" || props.auth.role === "broadcaster" ? (
				<RequestPanel auth={props.auth} />
			) : (
				<p>User not Mod</p>
			)}
		</div>
	);
}

export default Config;
