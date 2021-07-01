const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8080;

const servers = ['http://172.16.4.14:5372', 'http://172.16.4.14:4567'];

app.get('/', (req, res) => {
	res.send(servers);
});

app.listen(port);
