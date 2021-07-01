const express = require('express');
const app = express();
require('dotenv').config();

const domain = process.env.DOMAIN

const servers = {
	s1: domain + ':4567',
	s4: domain + ':1111',
	s2: domain + ':5372'
};

app.get('/', (req, res) => {
	res.send(servers);
});

app.listen(process.env.ME);
