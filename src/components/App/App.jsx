import React from "react";
import OAuth from "./components/OAuth";


function App(props) {
	return (
		<div>
			{props.visible && <OAuth auth={props.auth} />}
		</div>
	);
}

export default App;
