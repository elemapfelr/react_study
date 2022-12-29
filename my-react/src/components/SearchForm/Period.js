import React from "react";
import PeriodBtns from "./PeriodBtns";

function Period(props) {
	return (
		<div className="period">
			<b>기간 조회</b>
			<input
				type="text"
				name="dateTimePicker1"
				placeholder="YYYY-MM-DD"
				id="dp1672287512694"
				className="hasDatepicker"
			/>
			<span>~</span>
			<input
				type="text"
				name="dateTimePicker2"
				placeholder="YYYY-MM-DD"
				id="dp1672287512695"
				className="hasDatepicker"
			/>
			<PeriodBtns fastBtns={props.option.fastBtns} />
		</div>
	);
}

export default Period;
