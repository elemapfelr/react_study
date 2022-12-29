import React from "react";

function PeriodBtns({ fastBtns }) {
	if (fastBtns.length > 0) {
		return (
			<div className="fastBtns">
				{fastBtns.map((btn, idx) => (
					<button key={btn + idx} className="btn_style_2 btn_color_point">
						{btn}
					</button>
				))}
			</div>
		);
	}
}

export default PeriodBtns;
