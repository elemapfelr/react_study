import { React } from "react";
import "./Loading.scss";
import Pulse from "./assets/Pulse.svg";
import Spinner from "./assets/Spinner.svg";

function Loading() {
	return (
		<div className="loadingBox">
			<img src={Spinner} alt="loading"></img>
		</div>
	);
}

export default Loading;
