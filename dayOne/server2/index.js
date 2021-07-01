const express = require('express');
const fetch = require('node-fetch');
const app = express();

const getPort = () => {
	const def_port = 5372;
	if (process.argv.slice(2).length == 0) return def_port;
	const myArgs = process.argv.slice(2);
	const name = myArgs[0].split('=');
	if (name[0] == 'PORT' || name[0] == 'port') return name[1];
	return def_port;
};

app.use(express.text());

app.post('/', (req, res) => {
	if (req.body == 'pong') {
		console.log('serv2 - pong');
		setTimeout(async () => {
			let resept;
			await fetch('http://172.16.4.14:8080')
				.then((res) => res.json())
				.then(
					(body) =>
						(resept = body.filter(
							(p) => p != 'http://172.16.4.14:' + getPort()
						)[0])
				);
			await fetch(resept, {
				method: 'POST',
				body: 'ping',
				headers: { 'Content-Type': 'text/plain' },
			}).catch((err) => {
				console.log('servé - retry');
			});
		}, 500);
	}
});

app.listen(getPort());
