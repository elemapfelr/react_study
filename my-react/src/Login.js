import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import Loading from "./components/Loading/Loading";
import Modal from "./components/Modal/Modal";
import Alert from "./components/Alert/Alert";
import style from "./Login.module.scss";
import axios from "axios";
import CheckBox from "./components/CheckBox/CheckBox";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function Login(props) {
	const [alertObj, setAlertObj] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		props.setToken(null);
		localStorage.clear();
		navigate("/login");
	}, []);

	const [loadingState, setLoading] = useState(false);
	const loading = () => {
		setLoading(true);
	};
	const loading_end = () => {
		setLoading(false);
	};

	const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

	const idFocusRef = useRef();
	const pwFocusRef = useRef();

	const [id, setId] = useState({
		userId: "",
		chkId: "",
	});

	useEffect(() => {
		if (cookies.userId) {
			setId({ ...id, userId: cookies.userId, chkId: "" });
		}
	}, []);

	const [pw, setPw] = useState({
		userPw: "",
		chkPw: "",
	});
	const [idSave, setIdSave] = useState(false);

	const idCheckSpan = (msg) => {
		setId({ ...id, chkId: msg });
		loading_end();
		idFocusRef.current.focus();
	};
	const pwCheckSpan = (msg) => {
		setPw({ ...pw, chkPw: msg });
		loading_end();
		pwFocusRef.current.focus();
	};

	function login() {
		loading();
		if (id["userId"] === "") {
			idCheckSpan("아이디를 입력하세요");
		} else if (pw["userPw"] === "") {
			pwCheckSpan("비밀번호를 입력하세요");
		} else {
			let url = "http://localhost:3001";

			axios({
				method: "post",
				url: `${url}/api/v1/user/login`,
				data: {
					user_id: id["userId"],
					user_pw: pw["userPw"],
					login_class: "DMP",
				},
			})
				.then((res) => {
					// console.log(res.data);
					let data = res.data;
					if (data.result_code === "P000") {
						if (idSave) {
							const expires = moment().add("30", "days").toDate();
							setCookie("userId", id["userId"], { expires });
						} else {
							removeCookie("userId");
						}
						const tokenData = {
							leftTimeSeconds: 3600,
							leftTimeString: "01:00:00",
							checked: false,
							valid: true,
							accessToken: data.access_token,
							accessTokenExpire: data.access_token_expire,
							refreshToken: data.refresh_token,
							refreshTokenExpire: data.refresh_token_expire,
						};
						props.setToken(tokenData);
						localStorage.setItem("token", JSON.stringify(tokenData));
						localStorage.setItem("userName", data.user_account_name);
						localStorage.setItem("userId", id["userId"]);
						navigate("/");
					} else if (data.result_code === "P901") {
						idCheckSpan(data.result_msg);
						return false;
					} else if (data.result_code === "P902") {
						pwCheckSpan(data.result_msg);
					} else {
						// 기타 에러 핸들링
						setAlertObj({
							title: "오류",
							text: "로그인에 실패하였습니다.",
							text2: `Error Code : ${res.data.result_code} Error Message : ${res.data.result_msg}`,
							btn: [],
						});
						console.log(data);
						loading_end();
					}
				})
				.catch((e) => {
					// 통신 에러 핸들링
					setAlertObj({
						title: "Axios Error",
						text: "로그인 중 오류가 발생하였습니다.",
						text2: e,
						btn: [],
					});
					console.error(e);
					loading_end();
				});
		}
	}
	return (
		<div className={`${style.wrap}`}>
			{loadingState ? <Loading /> : null}
			<span className={`${style.version}`}>
				version <b></b>
			</span>
			<div className={`${style.login}`}>
				<img className={`${style.logo}`} src="./img/logo.svg" alt="logo" />
				<div className={`${style.loginBox}`}>
					<div className={`${style.leftBox}`}>
						<div className={`${style.idDiv}`}>
							<span
								className={
									`${style.chkId} ` + (id["chkId"] !== "" ? style.active : "")
								}
							>
								{id.chkId}
							</span>
							<input
								type="text"
								autoComplete="off"
								name="userId"
								id="userId"
								className={`${style.input}`}
								maxLength="35"
								placeholder="아이디"
								value={id["userId"]}
								onChange={(e) => {
									setId({ ...id, userId: e.target.value, chkId: "" });
								}}
								onKeyUp={() => {
									if (window.event.keyCode === 13) {
										login();
									}
								}}
								ref={idFocusRef}
							/>
						</div>
						<div className={`${style.pwDiv}`}>
							<span
								className={
									`${style.chkPw} ` + (pw["chkPw"] !== "" ? style.active : "")
								}
							>
								{pw.chkPw}
							</span>
							<input
								type="password"
								autoComplete="new-password"
								name="userPw"
								id="userPw"
								className={`${style.input}`}
								maxLength="15"
								placeholder="비밀번호"
								value={pw["userPw"]}
								onChange={(e) => {
									setPw({ ...pw, userPw: e.target.value, chkPw: "" });
								}}
								onKeyUp={() => {
									if (window.event.keyCode === 13) {
										login();
									}
								}}
								ref={pwFocusRef}
							/>
						</div>
					</div>
					<div className={`${style.rightBox}`}>
						<button
							id="loginOkBtn"
							className={`${style.loginOkBtn}`}
							onClick={login}
						>
							LOGIN
						</button>
					</div>
				</div>
				<div className={`${style.idSaveDiv}`}>
					<CheckBox id={"idSave"} setter={setIdSave} cookie={cookies.userId} />
					<span>아이디 저장</span>
				</div>
				<div className={`${style.ssoLogin}`}>
					<a href="/hiworks_login">
						<img src="./img/hiworks.svg" alt="hiworks" />
					</a>
				</div>
			</div>
			<Modal />
			<Alert alertObj={alertObj} setAlertObj={setAlertObj} />
		</div>
	);
}

export default Login;
