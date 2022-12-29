const axios = require('axios');
const config = require('./../config');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

module.exports = function (app, fs) {
	let url = config['api_url'];

	//메인페이지 접근 시
	app.get('/', function (req, res) {
		if (req.session['access_token'] == config['access_token']) {
		}
	});

	//API 요청 시
	app.post('/api/v1/:group/:code', function (req, res) {
		let body = req['body'];
		let group = req['params']['group'];
		let code = req['params']['code'];

		apiUrl = `${url}/api/v1/${group}/${code}`;

		let access_token = req.session['access_token']
			? req.session['access_token']
			: config['access_token'];
		if (code == 'login') {
			access_token = config['access_token'];
		}

		const headerData = {
			'Content-Type': 'application/json',
			access_token: access_token,
		};

		axios({
			Headers: headerData,
			method: 'post',
			url: apiUrl,
			data: body,
		}).then((res) => console.log(res.data));
	});
};
