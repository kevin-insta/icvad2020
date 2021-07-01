const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 5372;

app.use(express.text());

app.post('/', (req, res) => {
	// console.log(req.body);
	if (req.body == 'pong') {
		console.log('serv2 - pong');
		setTimeout(() => {
			fetch('http://localhost:4567', {
				method: 'POST',
				body: 'ping',
				headers: { 'Content-Type': 'text/plain' },
			}).catch((err) => {
				console.log('servé - retry');
			});
		}, 500);
	}
});

app.listen(port);
