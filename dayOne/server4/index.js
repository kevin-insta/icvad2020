const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

const domain = process.env.DOMAIN
const me = process.env.ME_PORT
const src = process.env.SRC_PORT
let serv1 = '';
let serv2 = '';

app.use(express.text());

const connect_s1 = async () => {
	if (!serv1) {
		await fetch(domain + ':' + src)
			.then((res) => res.json())
			.then((body) => serv1 = body.s1)
			.catch((err) => {
				console.log('serv4 - retry GET all servers');
				setTimeout(() => connect_s1(), 500);
			});
	}

	if(!!serv1) {
		fetch(serv1, {	method: 'POST',	body: 'ping',	headers: { 'Content-Type': 'text/plain' }})
			.catch((err) => {
				console.log('serv4 - retry');
				setTimeout(() => connect_s1(), 500);
			});
	} 
}

const connect_s2 = async () => {
	if (!serv2) {
		await fetch(domain + ':' + src)
			.then((res) => res.json())
			.then((body) => serv2 = body.s2)
			.catch((err) => {
				console.log('serv4 - retry GET all servers');
				setTimeout(() => connect_s2(), 500);
			});
	}

	if(!!serv2) {
		fetch(serv2, {	method: 'POST',	body: 'pong',	headers: { 'Content-Type': 'text/plain' }})
			.catch((err) => {
				console.log('serv4 - retry s2');
				setTimeout(() => connect_s2(), 500);
			});
	} 
}

connect_s2()

app.post('/', async (req, res) => {
	if (req.body == 'pong') {
		console.log('serv4 - pong');
		setTimeout(() => {
			connect_s1();
		}, 500)
	} else if (req.body == 'ping') {
		setTimeout(() => {
			console.log('serv4 - ping');
			connect_s2();
		}, 500)
	}
});

app.listen(me);
