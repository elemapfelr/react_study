import React from "react";
import "./MyPage.scss";
import axios from "axios";

function MyPage() {
	return (
		<>
			<h2>마이페이지</h2>
			<br />
			<article id="basicInfo">
				<h3>기본 정보</h3>
				<div className="id box">
					<p className="leftKey">아이디</p>
					<input defaultValue="" readOnly />
				</div>
				<div className="pw box">
					<p className="leftKey">비밀번호</p>
					<input type="password" defaultValue="" />
					<span className="showPw">
						<i className="fa-solid fa-eye"></i>
					</span>
				</div>
				<div className="userName box">
					<p className="leftKey">이름</p>
					<input defaultValue="" />
				</div>
			</article>
			<article id="socialInfo">
				<h3>소셜 로그인 정보</h3>
				<br />
				<h4>현재 연동된 소셜 아이디</h4>
				<p>DMP 계정과 연동되어 있는 소셜 계정을 보여줍니다.</p>
				<div className="social">
					<div className="hiworks box">
						<img src="./img/hiworks_icon.png" alt="hiworks" />
						<div className="loginInfo">
							<p className="connect"></p>
							<p className="connectDate"></p>
						</div>
						<div className="hoverBox">
							<i className="fa-solid fa-link-slash"></i> 연동 해제
						</div>
					</div>
				</div>
			</article>
		</>
	);
}

export default MyPage;
