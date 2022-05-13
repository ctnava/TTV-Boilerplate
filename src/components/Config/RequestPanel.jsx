import React, { useState } from 'react';
import api from '../util/api';
import * as jose from "jose";


function RequestPanel(props) {
    const [password, setPassword] = useState("");
    const [reports, setReports] = useState({archive:[]});

    function handleChange(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    function del(event) {
        event.preventDefault();
        const auth = {token:password};
        const data = {auth};
        api.req.del("bad_actor", data, auth)
        .then(()=>{
            api.req.get("bad_actor", props.auth)
            .then(res => {
                if (res.data) setReports(res.data);
                setPassword("");
            });
        }); 
    }
    
    function get(event) {
        event.preventDefault();
        api.req.get("bad_actor", props.auth)
        .then(res=>{if (res.data) setReports(res.data)});
    }

    return (<div>
    <form>
        <input
          onChange={handleChange}
          value={password}
          placeholder="password"
        />
        <button onClick={del}>Delete Reports</button>
    </form>
    <hr/>
    <button onClick={get}>Get Reports</button>
    {reports.archive.length > 0 && (<div>
        <h3>Reports</h3>
        <ul>
            {reports.archive.map(report =>
            <li>
                <span>{(new Date(report.timestamp * 1000)).toString()} || {report.reportType}</span><br/>
                <span>Channel: {report.auth.channelId} || Offender: {report.auth.userId}</span><br/>
                <span>ClientId: {report.auth.clientId}</span><br/>
                <span>Token: {JSON.stringify(jose.decodeJwt(report.auth.token), null, 2)}</span><br/>
            </li>
            )}
        </ul>
    </div>)}
    
    </div>);
}


export default RequestPanel;