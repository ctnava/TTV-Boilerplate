import bits from "../../util/twitch/bits";
import React, { useState } from "react";
import api from "../../util/api";

function RequestPanel(props) {
	const [data, setData] = useState(undefined);

	function getData(event) {
		event.preventDefault();
		api.get("ccpa_gdpr", props.auth, {opaqueId: props.auth.opaqueId})
		.then(res => {
			if (res.data.notice !== undefined) setData(res.data);
		});
	}

	function logs() {
		var items = [];
		data.logs.forEach((log, idx) => {
			const {order, ip, timestamp, auth} = log;
			const d = new Date(timestamp * 1000);
			const ymd = d.toLocaleString();
			items.push(<li key={`log-${idx}`}>
				<span>{ymd}</span><br/>
				<span>IP: {ip}</span><br/>
				<span>Set ({order.x}, {order.y}) to {order.color} on channel {auth.channelId}</span>
			</li>);
		});
		return items;
	}

	function reports() {
		var items = [];
		data.reports.forEach((report, idx) => {
			const {ip, timestamp, reportType} = report;
			const d = new Date(timestamp * 1000);
			const ymd = d.toLocaleString();
			items.push(<li key={`report-${idx}`}>
				<span>{ymd}</span><br/>
				<span>IP: {ip}</span><br/>
				<span>Incident: {reportType}</span>
			</li>);
		});
		return items;
	}

	function deleteData(event) {
		event.preventDefault();
		api.post("ccpa_gdpr", props.auth, {})
		.then(res => {
			if (res.data === "ok") window.location.reload();
		});
	}

	return (
		<div>
			<form>
				<h2>My Data</h2>
				{data !== undefined ? <div>
					<p>{data.notice}</p>
					<h2>Failed Transactions</h2>
					<ul>
						{logs().length > 0 ? logs() : "No Failures"}
					</ul>
					<hr />
					<h2>Reports</h2>
					<ul>
						{reports().length > 0 ? reports() : "No Reports"}
					</ul>
					<hr />
					<button onClick={deleteData}>Delete All Data</button>
				</div> : <button onClick={getData}>Get My Data</button>}
			</form>
		</div>
	);
}

export default RequestPanel;
