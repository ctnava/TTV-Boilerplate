import React, { useState } from 'react';
import api from '../util/api';


function RequestPanel(props) {
    const [password, setPassword] = useState("");
    const [reports, setReports] = useState({archive:[]});

    function handleChange(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    function del(event) {
        event.preventDefault();
        api.req.del("bad_actor", {auth:{password}}, {password})
        .then(()=>{
            api.req.get("bad_actor", {}, props.auth)
            .then(res=>{
                if (!res.data) setReports(res);
                setPassword("");
            });
        }); 
    }
    
    function get(event) {
        event.preventDefault();
        api.req.get("bad_actor", {}, props.auth).then(res=>{if (!res.data) setReports(res)});
    }

    return (<div>
    <button onClick={get}>Get Reports</button><hr/>
    <form>
        <input
          onChange={handleChange}
          value={password}
          placeholder="password"
        />
        <button onClick={del}>Delete Reports</button>
    </form>
    <p>{reports}</p>
    </div>);
}


export default RequestPanel;