const express = require('express');
const fetch = require('node-fetch');
const app = express();
let serv = '';

const getPort = () => {
	const def_port = 4567;
	if (process.argv.slice(2).length == 0) return def_port;
	const myArgs = process.argv.slice(2);
	const name = myArgs[0].split('=');
	if (name[0] == 'PORT' || name[0] == 'port') return name[1];
	return def_port;
};

app.use(express.text());

const connect = async (req) => {
	if (!serv) {
		await fetch('http://localhost:8080')
			.then((res) => res.json())
			.then(
				(body) =>
					(toto = body.filter(
						(p) => p != 'http://localhost:' + getPort()
					)[0])
			);
	}

	await fetch(toto, {
		method: 'POST',
		body: 'pong',
		headers: { 'Content-Type': 'text/plain' },
	}).catch((err) => {
		console.log('serv1 - retry');
		setTimeout(() => {
			connect();
		}, 500);
	});
};

connect();

app.post('/', (req, res) => {
	if (req.body == 'ping') {
		console.log('serv1 - ping');
		connect();
	}
});

app.listen(getPort());
