import React from "react";
import "./SiteMap.scss";
import MenuGroup from "./../components/SiteMap/MenuGroup";

function SiteMap(props) {
	const data = props.allPageData;
	const menuList = data.menu;
	const menuGroupList = data.menu_group;

	return (
		<>
			<h2>사이트 맵</h2>
			<br />
			<article>
				<div id="map">
					{menuGroupList.map((eachMenuGroup) => {
						const thisMenus = menuList.filter((menu) => {
							return menu.menu_group_seq_no == eachMenuGroup.menu_group_seq_no;
						});
						return (
							<MenuGroup
								key={eachMenuGroup.menu_group_seq_no}
								eachMenuGroup={eachMenuGroup}
								menuList={thisMenus}
							/>
						);
					})}
				</div>
			</article>
		</>
	);
}

export default SiteMap;
