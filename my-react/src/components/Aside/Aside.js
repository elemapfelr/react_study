import React from "react";
import "./Aside.scss";

function Aside({ children }) {
	return (
		<aside>
			<div className="leftList">
				<h3>심사 | 대출 리스트</h3>
				<span className="close_leftList">
					<i className="fa-solid fa-xmark"></i>
				</span>
				<div className="listSwitch">
					<button className="btn_style_3 btn_color_point">심사 리스트</button>
					<button className="btn_style_3 btn_color_gray">대출 리스트</button>
				</div>
				<div className="searchOption"></div>
				<div className="listTableBox">
					<table>
						<thead></thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div className="rightList">
				<h3>회원 리스트</h3>
				<div className="searchOption"></div>
				<ul className="scrollable"></ul>
			</div>
		</aside>
	);
}

export default Aside;
