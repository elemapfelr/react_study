import React, { useEffect } from "react";
import "./Modal.scss";

function Modal(props) {
	useEffect(() => {}, [props.modalObj]);
	return (
		<div className="modal">
			<div className="layerPopup">
				<div className="popupHead">
					<h3>-</h3>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<div className="popupBody"></div>
				<div className="btnBox"></div>
			</div>
		</div>
	);
}

export default Modal;
