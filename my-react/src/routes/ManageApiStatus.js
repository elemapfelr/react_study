import React from "react";
import "./ManageApiStatus.scss";
import axios from "axios";
import SearchForm from "../components/SearchForm/SearchForm";

function ManageApiStatus() {
	const obj = {
		period: {
			fastBtns: ["당일", "최근 일주일", "최근 한 달", "전체"],
		},
		options: [
			{
				title: "검색 조건1",
				checkBox: [{ opt1: "옵션 1" }, { opt2: "옵션 2" }, { opt3: "옵션 3" }],
			},
			{
				title: "검색 조건2",
				checkBox: [
					{ opt4: "옵션 1" },
					{ opt5: "옵션 2" },
					{ opt6: "옵션 3" },
					{ opt7: "옵션 4" },
					{ opt8: "옵션 5" },
				],
			},
		],
		textInput: true,
	};

	return (
		<>
			<h2>API 상태 관리</h2>
			<article id="summary">
				<div className="title">
					<div className="leftTitle">
						<p>실시간 API 현황</p>
					</div>
					<button id="interval" className="interval">
						<p>자동 검사 인터벌</p>
						<i className="fa-regular fa-clock duration"></i>
					</button>
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
						<h5 className="num">
							<b>0</b>건
						</h5>
					</div>
					<div className="apiErr">
						<i className="fa-solid fa-triangle-exclamation"></i>
						<i className="triangle fa-solid fa-triangle-exclamation"></i>
						<h5>API 오류</h5>
						<h5 className="num">
							<b>0</b>건
						</h5>
					</div>
					<div className="checkAPIBox">
						<h5>마지막 검사 시간</h5>
						<p>0000-00-00 00:00:00</p>
						<button id="apiAllCheckBtn" className="btn_style_3 btn_color_point">
							전체 API 검사 <i className="fa-solid fa-plug-circle-check"></i>
						</button>
					</div>
				</div>
			</article>
			<article id="apiStatus">
				<div className="flexBox">
					<div className="leftBox">
						<h3>개별 API 상태</h3>
						<br />
						<SearchForm option={obj} />
						<div className="tableTopDiv">
							<div className="detailCount">
								<div className="normal countBox">
									<p>
										정상 : <b className="count">0</b>
									</p>
								</div>
								<div className="caution countBox">
									<p>
										주의 : <b className="count">0</b>
									</p>
								</div>
								<div className="error countBox">
									<p>
										오류 : <b className="count">0</b>
									</p>
								</div>
								<div className="unknown countBox">
									<p>
										알수없음 : <b className="count">0</b>
									</p>
								</div>
							</div>
							<p className="totalCount">
								Total Count : <strong>0</strong>
							</p>
						</div>
						<div className="tableBox scrollable">
							<table>
								<thead></thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<div className="rightBox">
						<h3>로그</h3>
						<br />
						<div className="log scrollable">
							<table>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
			</article>
		</>
	);
}

export default ManageApiStatus;
