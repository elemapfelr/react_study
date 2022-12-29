const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const axios = require('axios');
const config = require('./config');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'my-react/build')));

app.listen(3001, function () {
	console.log('listening on 3001');
});

//API 요청 시
app.post('/api/v1/:group/:code', async function (req, res) {
	let url = config['api_url'];
	let body = req['body'];
	let group = req['params']['group'];
	let code = req['params']['code'];

	apiUrl = `${url}/api/v1/${group}/${code}`;
	let access_token = req.cookies['access_token']
		? req.cookies['access_token']
		: config['access_token'];

	let refresh_token = req.cookies['refresh_token'] ? req.cookies['refresh_token'] : null;

	const headerData = {
		'Content-Type': 'application/json',
		access_token: access_token,
		refresh_token: refresh_token,
	};

	console.log(req.cookies);

	const apiRes = await axios({
		headers: headerData,
		method: 'post',
		url: apiUrl,
		data: body,
	}).then((response) => {
		return response.data;
	});

	if (apiRes) {
		if (code == 'login') {
			res.cookie('access_token', apiRes['access_token'], {
				httpOnly: true,
			});
			res.cookie('refresh_token', apiRes['refresh_token'], {
				httpOnly: true,
			});
		}
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.write(JSON.stringify(apiRes));
		res.end();
	}
});
app.get('/api/v1/:group/:code', async function (req, res) {
	let url = config['api_url'];
	let group = req['params']['group'];
	let code = req['params']['code'];

	apiUrl = `${url}/api/v1/${group}/${code}`;

	let access_token = req.cookies['access_token']
		? req.cookies['access_token']
		: config['access_token'];

	const headerData = {
		'Content-Type': 'application/json',
		access_token: access_token,
	};

	const apiRes = await axios({
		headers: headerData,
		method: 'get',
		url: apiUrl,
	}).then((response) => {
		return response.data;
	});

	if (apiRes) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.write(JSON.stringify(apiRes));
		res.end();
	}
});

// 라우팅을 nodejs가 사용하지않고 리액트에게 넘김
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '/my-react/build/index.html'));
});
