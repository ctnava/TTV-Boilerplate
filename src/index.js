import React from "react"
import ReactDOM from 'react-dom/client';
import TTV from "./components/TTV"


const presets = {
    config: "Config",
    live: "LiveConfig",
    mobile: "Mobile",
    panel: "Panel",
    component: "VideoComponent",
    overlay: "VideoOverlay"
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TTV type={presets.panel} />);