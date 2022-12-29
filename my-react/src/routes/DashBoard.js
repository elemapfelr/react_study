import React from "react";
import { Link } from "react-router-dom";
import "./DashBoard.scss";

function DashBoard() {
	return (
		<article>
			<div className="gridArea">
				<div className="gridItem apiStatus">
					<div className="title">
						<div className="leftTitle">
							<p>실시간 API 현황</p>
						</div>
						<div className="rightIcon">
							<Link to="/system/manageApiStatus">
								<i className="fa-solid fa-link pageLink"></i>
							</Link>
						</div>
					</div>
					<div className="content">
						<div className="apiTimeGap">
							<h5>Response Time</h5>
							<p>
								평균 <strong>0</strong> ms
							</p>
						</div>
						<div className="arrowAnimation">
							<i className="fa-solid fa-chevron-right"></i>
							<i className="fa-solid fa-chevron-right"></i>
							<i className="fa-solid fa-chevron-right"></i>
						</div>
						<div className="apiReq">
							<i className="fa-solid fa-cloud-arrow-down"></i>
							<h5>정상 API</h5>
							<h5 className="apiReqNum">0건</h5>
						</div>
						<div className="apiErr">
							<i className="fa-solid fa-triangle-exclamation"></i>
							<i className="triangle fa-solid fa-triangle-exclamation"></i>
							<h5>API 에러</h5>
							<h5 className="apiErrNum">0건</h5>
						</div>
						<div className="checkAPIBox">
							<h5>마지막 검사 시간</h5>
							<p>0000-00-00 00:00:00</p>
						</div>
					</div>
				</div>
				<div className="gridItem serverStatus">
					<div className="title">
						<div className="leftTitle">
							<p>서버 현황</p>
						</div>
						<div className="rightIcon">
							<i className="fa-solid fa-ellipsis"></i>
						</div>
					</div>
					<div className="content"></div>
				</div>
				<div className="gridItem">
					<div className="title">
						<div className="leftTitle">
							<p>방문자 통계</p>
						</div>
						<div className="rightIcon">
							<Link to="/Pages/visit_statistics">
								<i className="fa-solid fa-link pageLink"></i>
							</Link>
						</div>
					</div>
					<div className="content relative">
						<canvas id="visitors">
							This text is displayed if your browser does not support HTML5
							Canvas.
						</canvas>
					</div>
				</div>
				<div className="gridItem">
					<div className="title">
						<div className="leftTitle">
							<p>API 요청 통계</p>
						</div>
						<div className="rightIcon">
							<Link to="/Pages/api_statistics">
								<i className="fa-solid fa-link pageLink"></i>
							</Link>
						</div>
					</div>
					<div className="content relative">
						<canvas id="apiStatistics">
							This text is displayed if your browser does not support HTML5
							Canvas.
						</canvas>
					</div>
				</div>
			</div>
		</article>
	);
}

export default DashBoard;
