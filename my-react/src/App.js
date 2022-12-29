import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Inflow from "./Inflow";
import Login from "./Login";
import { useState } from "react";

const localToken = () => {
	return JSON.parse(localStorage.getItem("token"));
};

function App() {
	// console.log(localToken());
	const [token, setToken] = useState(localToken());
	return (
		<Routes>
			<Route path="/login" element={<Login setToken={setToken} />} />
			<Route
				path="/*"
				element={
					localToken() ? (
						<Inflow token={token} setToken={setToken} />
					) : (
						<Login setToken={setToken} />
					)
				}
			/>
		</Routes>
	);
}
export default App;
