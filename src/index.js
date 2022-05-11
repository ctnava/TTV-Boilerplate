import React from "react"
import ReactDOM from "react-dom"
import TTV from "./components/TTV"


const presets = {
    config: <TTV type="Config" />,
    live: <TTV type="LiveConfig" />,
    mobile: <TTV type="Mobile" />,
    panel: <TTV type="Panel" />,
    component: <TTV type="VideoComponent" />,
    overlay: <TTV type="VideoOverlay" />
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(presets.panel);