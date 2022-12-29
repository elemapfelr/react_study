import React, { useEffect } from "react";
import "./CheckBox.scss";

function CheckBox(props) {
	useEffect(() => {
		if (props.cookie && props.setter) {
			const defaultChecked = props.cookie ? true : false;
			props.setter(defaultChecked);
		}
	}, []);
	return (
		<div className="checkBoxDiv">
			<input
				type="checkBox"
				className="chkBox"
				id={props.id}
				defaultChecked={props.cookie ? true : false}
				onClick={(e) => {
					if (props.setter) {
						if (e.target.checked) {
							props.setter(true);
						} else {
							props.setter(false);
						}
					}
				}}
			/>
			<label className="checkBox" htmlFor={props.id}></label>
			<span>{props.text}</span>
		</div>
	);
}

export default CheckBox;
