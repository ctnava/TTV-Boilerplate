import React from "react"
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TTV from "./components/TTV"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>

    <Routes>
        <Route path="/config" element={<TTV type="Config" />} />
        <Route path="/live_config" element={<TTV type="LiveConfig" />} />
        <Route path="/mobile" element={<TTV type="Mobile" />} />
        <Route path="/panel" element={<TTV type="Panel" />} />
        <Route path="/video_component" element={<TTV type="VideoComponent" />} />
        <Route path="/video_overlay" element={<TTV type="VideoOverlay" />} />
    </Routes>

</BrowserRouter>);