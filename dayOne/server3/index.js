const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8080;

const servers = ['http://localhost:5372', 'http://localhost:4567'];

app.get('/', (req, res) => {
	res.send(servers);
});

app.listen(port);