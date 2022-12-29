import React, { useEffect, useState } from "react";
import "./Left.scss";
import { useNavigate } from "react-router-dom";

function Left(props) {
	const [btnActive, setBtnActive] = useState();

	const toggleActive = (e) => {
		setBtnActive((prev) => {
			return e.target.value;
		});
	};

	const openSubMenu = () => {
		props.setWrapState(() => {
			let wrapClassName = props.wrapState;
			if (wrapClassName.includes("headerLeftIconHide")) {
				wrapClassName = wrapClassName.replace("headerLeftIconHide", "");
			}
			if (wrapClassName.includes("subMenuClose")) {
				wrapClassName = wrapClassName.replace("subMenuClose", "");
			}
			return wrapClassName;
		});
	};

	function MenuGroup() {
		const filterMenu = (e) => {
			if (props.menuData) {
				const menuData = props.menuData;
				const filteredMenu = menuData.filter(
					(menu) => menu["menu_group_seq_no"] == e.target.dataset.menuGroupSeqNo
				);
				props.setUnderMenuGroup(filteredMenu);
			}
		};

		const navigate = useNavigate();

		if (props.error)
			return (
				<p style={{ color: "#fff" }}>
					메뉴를 불러오는 중에 에러가 발생했습니다
				</p>
			);

		if (props.menuGroupData) {
			return (
				<>
					<li
						onClick={() => {
							setBtnActive("");
							navigate("/");
							props.setWrapState(() => {
								let wrapClassName = props.wrapState;
								if (!wrapClassName.includes("subMenuClose")) {
									wrapClassName = `${wrapClassName} subMenuClose`;
								}
								if (!wrapClassName.includes("headerLeftIconHide")) {
									wrapClassName = `${wrapClassName} headerLeftIconHide`;
								}
								return wrapClassName;
							});
						}}
						key="Dashboard"
					>
						<i className="fa-solid fa-chalkboard"></i>
						<p>대쉬보드</p>
					</li>
					{props.menuGroupData.map((eachMenuGroup) => (
						<li
							value={eachMenuGroup["menu_group_seq_no"]}
							onClick={(e) => {
								toggleActive(e);
								filterMenu(e);
								openSubMenu();
							}}
							className={
								eachMenuGroup["menu_group_seq_no"] == btnActive ? " active" : ""
							}
							key={eachMenuGroup["menu_group_seq_no"]}
							data-menu-group-seq-no={eachMenuGroup["menu_group_seq_no"]}
						>
							<i className={eachMenuGroup["menu_group_icon"]}></i>
							<p>{eachMenuGroup["menu_group_name"]}</p>
						</li>
					))}
				</>
			);
		}
	}

	return (
		<div className="left">
			<menu>
				<div className="logoTop">
					<img src="/img/logo.svg" alt="logo" />
					<span className="version">
						v.<i>202212221556</i>
					</span>
				</div>
				<div className="nav">
					<ul>
						<MenuGroup />
					</ul>
					<div
						className="menuChange"
						onClick={() => {
							props.setWrapState(() => {
								const wrapClassName = props.wrapState;
								if (!wrapClassName.includes("menuClose")) {
									return `${wrapClassName} menuClose`;
								} else {
									return wrapClassName.replace("menuClose", "");
								}
							});
						}}
					>
						<i className="fa-solid fa-angles-left"></i>
						<span>Simple Menu</span>
					</div>
				</div>
			</menu>
		</div>
	);
}

export default Left;
