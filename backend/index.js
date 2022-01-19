const express = require('express');

const PORT = process.env.BACKEND_PORT || 3100;

const app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/stateData.json');
});

app.listen(PORT, () => {
	console.log(`Server listening on localhost:${PORT}`);
});
