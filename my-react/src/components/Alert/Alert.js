import React, { useEffect } from "react";
import "./Alert.scss";
import Btn from "./Btn";

function Alert({ alertObj, setAlertObj }) {
	if (alertObj !== null) {
		return (
			<div className="alert_modal">
				<div className="alert_layerPopup">
					<div className="alert_popupHead">
						<h3>{alertObj.title}</h3>
						<i
							className="fa-solid fa-xmark"
							onClick={() => {
								if (alertObj.xCallback) {
									alertObj.xCallback();
								}
								setAlertObj(null);
							}}
						></i>
					</div>
					<div className="alert_popupBody">
						<div className="box">
							<p>{alertObj.text}</p>
							<p>
								<small>{alertObj.text2 ?? ""}</small>
							</p>
						</div>
					</div>
					<div className="alert_btnBox">
						<Btn option={alertObj.btn} />
					</div>
				</div>
			</div>
		);
	}
}

export default Alert;

const alertObj = {
	title: "타이틀",
	text: "",
	text2: "",
	btn: [
		{
			id: "",
			text: "",
			color: "",
			callback: () => {},
		},
		{
			id: "",
			text: "",
			color: "",
			callback: () => {},
		},
	],
	xCallback: () => {},
};
