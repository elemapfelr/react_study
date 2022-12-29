import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

String.prototype.toHHMMSS = function () {
	var sec_num = parseInt(this, 10); // don't forget the second param
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return hours + ":" + minutes + ":" + seconds;
};

function Header(props) {
	const navigate = useNavigate();
	const userName = localStorage.getItem("userName");
	return (
		<header>
			<div className="header_left">
				<i
					className="fa-solid fa-bars"
					onClick={() => {
						props.setWrapState(() => {
							const wrapClassName = props.wrapState;
							if (!wrapClassName.includes("subMenuClose")) {
								return `${wrapClassName} subMenuClose`;
							} else {
								return wrapClassName.replace("subMenuClose", "");
							}
						});
					}}
				></i>
			</div>
			<div className="header_mid">
				<span className="leftGo goBtn">
					<i className="fa-solid fa-angle-left"></i>
				</span>
				<span className="rightGo goBtn">
					<i className="fa-solid fa-angle-right"></i>
				</span>
				<div className="checkList">
					<ul className="listBarWrap">
						<li className="listBar">
							<ul className="alarmBox">
								<li>
									<span className="newAlarm"></span>
									<p>회원가입</p>
									<small>2건</small>
								</li>
								<li>
									<span className="newAlarm"></span>
									<p>접수</p>
									<small>1건</small>
								</li>
								<li>
									<span></span>
									<p>1차심사</p>
									<small>2건</small>
								</li>
								<li>
									<span className="newAlarm"></span>
									<p>진행대기</p>
									<small>1건</small>
								</li>
								<li>
									<span></span>
									<p>2차심사</p>
									<small>2건</small>
								</li>
								<li>
									<span></span>
									<p>재심사</p>
									<small>1건</small>
								</li>
								<li>
									<span className="newAlarm"></span>
									<p>자서대기</p>
									<small>3건</small>
								</li>
								<li>
									<span className="newAlarm"></span>
									<p>입금대기</p>
									<small>3건</small>
								</li>
								<li>
									<span></span>
									<p>대출완료</p>
									<small>3건</small>
								</li>
								<li>
									<span className="newAlarm"></span>
									<p>보류,부결</p>
									<small>1건</small>
								</li>
							</ul>
						</li>
						<li className="listBar">
							<p>알림</p>
						</li>
						<li className="listBar">
							<p>공지사항</p>
						</li>
					</ul>
				</div>
				<ul className="checkListPageBtn">
					<li className="on">
						<span></span>
					</li>
					<li>
						<span></span>
					</li>
					<li>
						<span></span>
					</li>
				</ul>
				<div className="userBox">
					<div className="middleBox">
						<p className="helloUser">
							<b>{userName}</b> 님
						</p>
						<div className="flex">
							<span
								className={
									"timeOut " +
									(props.token.leftTimeSeconds < 300 ? "crush" : "")
								}
							>
								<strong>
									{props.token.leftTimeSeconds > 0
										? props.token.leftTimeString
										: "00:00:00"}
								</strong>
							</span>
							<button
								id="refreshToken"
								className="btn_style_2 btn_color_point"
								onClick={props.refreshToken}
							>
								연장 <i className="fa-solid fa-arrows-rotate"></i>
							</button>
							<Link to="mypage">
								<button id="mypage" className="btn_style_3 btn_color_point">
									마이페이지
								</button>
							</Link>
						</div>
					</div>
					<span
						className="logOut"
						onClick={() => {
							props.setAlertObj({
								title: "로그아웃 확인",
								text: "로그아웃 하시겠습니까?",
								btn: [
									{
										id: "logout",
										text: "로그아웃",
										color: "crush",
										callback: () => {
											navigate("/login");
										},
									},
									{
										text: "취소",
										color: "gray",
										callback: () => {
											props.setAlertObj(null);
										},
									},
								],
							});
						}}
					>
						<p>로그아웃</p>
						<i className="fa-solid fa-arrow-right-from-bracket"></i>
					</span>
				</div>
			</div>
			<div className="header_right">
				<i
					className="fa-solid fa-ellipsis-vertical"
					onClick={() => {
						props.setWrapState(() => {
							let wrapClassName = props.wrapState;
							if (wrapClassName.includes("rightListClose")) {
								wrapClassName = wrapClassName.replace("rightListClose", "");
							} else {
								wrapClassName = `${wrapClassName} rightListClose`;
							}
							return wrapClassName;
						});
					}}
				></i>
			</div>
		</header>
	);
}

export default Header;
