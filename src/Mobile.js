import React from "react"
import ReactDOM from 'react-dom/client';
import TTV from "./components/TTV"

import * as serviceWorker from './util/serviceWorker';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TTV type="Mobile" />);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();