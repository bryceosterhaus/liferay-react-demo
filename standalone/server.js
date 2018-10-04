const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

app.use('/api-proxy/*', function(req, res) {
	const url = `http://127.0.0.1:8080${req.originalUrl.replace(
		'/api-proxy',
		''
	)}`;

	req.pipe(request(url)).pipe(res);
});

app.use('/static', express.static(path.join(__dirname, 'build/static')));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!')); // eslint-disable-line
