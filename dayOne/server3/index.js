const express = require('express');
const app = express();
require('dotenv').config();

const servers = ['http://172.16.4.14:5372', 'http://172.16.4.14:4567'];

app.get('/', (req, res) => {
	res.send(servers);
});

app.listen(process.env.ME);
