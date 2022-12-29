import React, { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./components/Loading/Loading";
import Wrap from "./components/Wrap/Wrap";
import Left from "./components/Left/Left";
import Right from "./components/Right/Right";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import Section from "./components/Section/Section";
import Aside from "./components/Aside/Aside";
import Modal from "./components/Modal/Modal";
import Alert from "./components/Alert/Alert";
import DashBoard from "./routes/DashBoard";
import MyPage from "./routes/MyPage";
import NotFound from "./routes/NotFound";
import axios from "axios";
import ManageApiStatus from "./routes/ManageApiStatus";
import SiteMap from "./routes/SiteMap";

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

function Inflow(props) {
	const navigate = useNavigate();
	const [loadingState, setLoading] = useState(false);
	const loading = () => {
		setLoading(true);
	};
	const loading_end = () => {
		setLoading(false);
	};
	const [error, setError] = useState(null);
	const [allPageData, setAllPageData] = useState();
	const [menuData, setMenuData] = useState();
	const [underMenuGroup, setUnderMenuGroup] = useState();
	const [menuGroupData, setMenuGroupData] = useState();
	const [wrapState, setWrapState] = useState(
		"leftListClose subMenuClose headerLeftIconHide"
	);
	const [modalObj, setModalObj] = useState(null);
	const [alertObj, setAlertObj] = useState(null);

	const interval = useRef(null);
	useEffect(() => {
		const expireDate = new Date(props.token["accessTokenExpire"]);
		// let expireDate = new Date("2022-12-29 11:24:20");
		const firstLoadTime = new Date();
		if (expireDate - firstLoadTime < 0) {
			localStorage.removeItem("token");
			navigate("/login");
		}
	}, []);
	useEffect(() => {
		const expireDate = new Date(props.token["accessTokenExpire"]);
		// let expireDate = new Date("2022-12-29 11:24:20");
		interval.current = setInterval(() => {
			let now = new Date();
			let leftTime = Math.ceil((expireDate - now) / 1000);

			if (leftTime <= 0) {
				props.setToken((prevState) => ({
					...prevState,
					valid: false,
					leftTimeSeconds: 0,
				}));
			} else {
				props.setToken((prevState) => ({
					...prevState,
					leftTimeSeconds: leftTime,
					leftTimeString: String(leftTime).toHHMMSS(),
				}));
				localStorage.setItem("token", JSON.stringify(props.token));
			}
		}, 1000);
		return () => clearInterval(interval.current);
	}, [props.token]);

	const refreshToken = () => {
		let url = "http://localhost:3001";
		axios({
			method: "post",
			url: `${url}/api/v1/token/tokenIUD`,
			data: {
				user_account_name: localStorage.getItem("userId"),
				act_evt: "req",
			},
		})
			.then((res) => {
				if (res.data.result_code == "P000") {
					props.setToken({
						leftTimeSeconds: 3600,
						leftTimeString: "01:00:00",
						checked: false,
						valid: true,
						accessToken: res.data.access_token,
						accessTokenExpire: res.data.access_token_expire,
						refreshToken: res.data.refresh_token,
						refreshTokenExpire: res.data.refresh_token_expire,
					});
					localStorage.setItem("token", JSON.stringify(props.token));
				} else {
					setAlertObj({
						title: "오류",
						text: "토큰 재발급이 실패하였습니다.",
						text2: `Error Code : ${res.data.result_code} Error Message : ${res.data.result_msg}`,
						btn: [],
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		if (
			props.token["leftTimeSeconds"] <= 300 &&
			props.token["checked"] == false
		) {
			props.setToken((prevState) => {
				return { ...prevState, checked: true };
			});
			setAlertObj({
				title: "로그인 연장 확인",
				text: "로그아웃까지 5분 남았습니다. 로그인 시간을 연장하시겠습니까?",
				text2: "연장하기를 누르실 경우 1시간으로 연장됩니다.",
				btn: [
					{
						text: "연장하기",
						color: "point",
						callback: () => {
							refreshToken();
						},
					},
				],
			});
		} else if (props.token["valid"] == false) {
			setAlertObj({
				title: "로그아웃 확인",
				text: "세션이 만료되어 다시 로그인해야 합니다.",
				btn: [
					{
						text: "로그아웃",
						color: "point",
						callback: () => {
							navigate("/login");
						},
					},
				],
				xCallback: () => {
					navigate("/login");
				},
			});
		}
	}, [props.token]);

	useEffect(() => {
		const url = "http://localhost:3001";
		const fetchMenu = async () => {
			try {
				setError(null);
				setMenuData(null);
				setMenuGroupData(null);
				setLoading(true);
				const res = await axios({
					method: "get",
					url: `${url}/api/v1/menu/menuList`,
				});
				setAllPageData(res.data);

				const menuGroupData = res.data.menu_group;
				const filteredMenuGroupData = menuGroupData.filter(
					(eachMenuGroup) => eachMenuGroup["menu_group_view_yn"] == "Y"
				);
				setMenuGroupData(filteredMenuGroupData);
				const menuData = res.data.menu;
				const filteredMenuData = menuData.filter(
					(eachMenu) =>
						eachMenu["menu_view_yn"] == "Y" &&
						eachMenu["menu_group_seq_no"] !== null
				);
				setMenuData(filteredMenuData);
			} catch (e) {
				setError(e);
			}
			setLoading(false);
		};
		fetchMenu();
	}, []);

	return (
		<>
			{loadingState ? <Loading /> : null}
			<Wrap className={wrapState}>
				<Left
					menuGroupData={menuGroupData}
					menuData={menuData}
					setUnderMenuGroup={setUnderMenuGroup}
					error={error}
					setWrapState={setWrapState}
					wrapState={wrapState}
				/>
				<Right>
					<Header
						wrapState={wrapState}
						setWrapState={setWrapState}
						token={props.token}
						setAlertObj={setAlertObj}
						refreshToken={refreshToken}
					/>
					<Container>
						<Nav underMenuGroup={underMenuGroup} wrapState={wrapState} />
						<Main>
							<Toolbar wrapState={wrapState} setWrapState={setWrapState} />
							<Section>
								<Routes>
									<Route path="/" element={<DashBoard />} />
									<Route path="MyPage" element={<MyPage />} />
									<Route
										path="SiteMap"
										element={<SiteMap allPageData={allPageData} />}
									/>
									<Route path="ManageApiStatus" element={<ManageApiStatus />} />
									<Route path="*" element={<NotFound />} />
								</Routes>
							</Section>
						</Main>
						<Aside />
					</Container>
				</Right>
				<Modal modalObj={modalObj} />
				<Alert alertObj={alertObj} setAlertObj={setAlertObj} />
			</Wrap>
		</>
	);
}

export default Inflow;
