import React from "react";

function Btn(props) {
	if (props.option.length > 0) {
		return (
			<>
				{props.option.map((btn, idx) => (
					<button
						key={btn.id ?? idx}
						className={btn.color ?? "gray"}
						onClick={() => {
							return btn.callback
								? btn.callback_param
									? btn.callback(btn.callback_param)
									: btn.callback()
								: null;
						}}
					>
						{btn.text ?? "확인"}
					</button>
				))}
			</>
		);
	}
}

export default Btn;
