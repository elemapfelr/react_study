import React from "react";
import "./Wrap.scss";

function Wrap(props) {
	return (
		<div id="wrap" className={props.className}>
			{props.children}
		</div>
	);
}

export default Wrap;
