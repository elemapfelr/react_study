import React, { useEffect, useState } from "react";
import "./Toolbar.scss";
import { Link } from "react-router-dom";

function Toolbar(props) {
	const [fullScreen, setFullScreen] = useState({
		state: false,
		html: "Full Screen",
		icon: "fa-solid fa-up-right-and-down-left-from-center",
	});
	useEffect(() => {
		if (fullScreen["state"]) {
			props.setWrapState(() => {
				const wrapClassName = props.wrapState;
				return `${wrapClassName} fullScreen`;
			});
		} else {
			props.setWrapState(() => {
				const wrapClassName = props.wrapState;
				return wrapClassName.replace("fullScreen", "");
			});
		}
	}, [fullScreen]);
	return (
		<div className="toolbar">
			<div className="leftToolBar">
				<p className="currMenuGroup"></p>
				<span className="slash">
					<i className="fa-solid fa-chevron-right"></i>
				</span>
				<p className="currMenu"></p>
				<Link className="siteMap" to="SiteMap">
					사이트맵
				</Link>
			</div>
			<div className="rightToolBar">
				<span className="manual">
					<i className="fa-solid fa-circle-question"></i>Need help?
				</span>
				<span
					className="fullsize"
					onClick={() => {
						if (!fullScreen["state"]) {
							setFullScreen({
								state: true,
								html: "Normal Screen",
								icon: "fa-solid fa-down-left-and-up-right-to-center",
							});
						} else {
							setFullScreen({
								state: false,
								html: "Full Screen",
								icon: "fa-solid fa-up-right-and-down-left-from-center",
							});
						}
					}}
				>
					<i className={fullScreen["icon"]}></i>
					<span>{fullScreen["html"]}</span>
				</span>
				<span className="popup">
					<i className="fa-solid fa-square-arrow-up-right"></i>
					<span>Popup Screen</span>
				</span>
			</div>
		</div>
	);
}

export default Toolbar;
