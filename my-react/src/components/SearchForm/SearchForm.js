import React from "react";
import "./SearchForm.scss";
import Period from "./Period";
import CheckBox from "./../CheckBox/CheckBox";

function SearchForm({ option }) {
	return (
		<div className="searchOption">
			{option.period ? <Period option={option.period} /> : null}
			{option.options.map((row, idx) => {
				return (
					<div className="optionRow" key={row.title}>
						<b>{row.title}</b>
						<div className="checkBoxRow" id={row.title}>
							{row.checkBox.map((row, idx) => {
								let key = Object.keys(row)[0];
								let value = Object.values(row)[0];
								return <CheckBox id={key} key={key} text={value} />;
							})}
						</div>
					</div>
				);
			})}
			<div className="textInputRow">
				<b>리스트 내 검색</b>
				<input name="searchInput" type="text" />
				<button className="btn_style_3 btn_color_point" id="searchBtn">
					<i className="fa-solid fa-magnifying-glass"></i> 검색
				</button>
			</div>
		</div>
	);
}

export default SearchForm;

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
			checkBox: {
				opt4: "옵션 1",
				opt5: "옵션 2",
				opt6: "옵션 3",
				opt7: "옵션 4",
				opt8: "옵션 5",
			},
		},
	],
	textInput: true,
};
