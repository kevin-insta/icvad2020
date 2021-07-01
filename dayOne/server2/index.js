const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

const domain = process.env.DOMAIN
const me = process.env.ME_PORT
const src = process.env.SRC_PORT
let serv = ''

app.use(express.text());

const connect = async () => {
	if (!serv) {
		await fetch(domain + ':' + src)
			.then((res) => res.json())
			.then((body) => (serv = body.filter((p) => p != (domain +':' + me))[0]))
			.catch((err) => {
				console.log('serv2 - retry GET all servers');
				setTimeout(() => connect(), 500);
			});
	}

	if(!!serv) {
		await fetch(serv, {
			method: 'POST',
			body: 'ping',
			headers: { 'Content-Type': 'text/plain' },
		}).catch((err) => {
			console.log('serv2 - retry');
			setTimeout(() => connect(), 500);
		});
	} 
};

app.post('/', (req, res) => {
	if (req.body == 'pong') {
		console.log('serv2 - pong');
		setTimeout(() => connect(), 500);
	}
});

app.listen(me);
