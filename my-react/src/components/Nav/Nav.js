import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Nav.scss";

function Nav(props) {
	String.prototype.caplitalizeFirstLetter = function () {
		var string = this;
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const [btnActive, setBtnActive] = useState();

	const toggleActive = (e) => {
		setBtnActive((prev) => {
			return e.target.parentNode.value;
		});
	};

	useEffect(() => {
		if (props.wrapState.includes("headerLeftIconHide")) {
			setBtnActive(null);
		}
	}, [props.wrapState]);

	function Menu() {
		if (props.underMenuGroup) {
			return (
				<ul className="active">
					{props.underMenuGroup.map((menu) => {
						return (
							<li
								key={menu.menu_seq_no}
								value={menu.menu_seq_no}
								onClick={toggleActive}
								className={menu["menu_seq_no"] == btnActive ? "active" : ""}
							>
								<Link
									to={menu.menu_link_url
										.replace("/system/", "")
										.caplitalizeFirstLetter()}
								>
									{menu.menu_name}
								</Link>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return null;
		}
	}

	return (
		<nav className="subMenu">
			<Menu />
		</nav>
	);
}

export default Nav;
