import React from "react";
import { Link } from "react-router-dom";

function MenuGroup(props) {
	String.prototype.caplitalizeFirstLetter = function () {
		var string = this;
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const data = props.eachMenuGroup;
	const menuList = props.menuList;
	return (
		<div className="menuBox">
			<h5>{data.menu_group_name}</h5>
			<ul className="subMenuBox">
				{menuList.map((menu) => {
					const url = menu.menu_link_url
						.replace("/system/", "/")
						.caplitalizeFirstLetter();
					return (
						<li key={menu.menu_seq_no}>
							<Link to={url}>{menu.menu_name}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default MenuGroup;
