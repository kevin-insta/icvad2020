const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

const domain = process.env.DOMAIN
const me = process.env.ME_PORT
const src = process.env.SRC_PORT
let serv = '';

app.use(express.text());

const connect = async () => {
	if (!serv) {
		await fetch(domain + ':' + src)
			.then((res) => res.json())
			.then((body) => (serv = body.filter((p) => p != (domain +':' + me))[0]))
			.catch((err) => {
				console.log('serv1 - retry GET all servers');
				setTimeout(() => connect(), 500);
			});
	}
	
	if(!!serv) {
		await fetch(serv, {
			method: 'POST',
			body: 'pong',
			headers: { 'Content-Type': 'text/plain' },
		}).catch((err) => {
			console.log('serv1 - retry');
			setTimeout(() => connect(), 500);
		});
	} 
};

connect();

app.post('/', (req, res) => {
	if (req.body == 'ping') {
		console.log('serv1 - ping');
		connect();
	}
});

app.listen(me);
