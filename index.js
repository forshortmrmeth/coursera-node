'use strict';
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const HOST = '0.0.0.0';
const PORT = 3004;


const app = express();
app.use(morgan('dev'));
app.use(express.static(path.resolve('public')));
app.use((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>Hello, wolrd!</h1>');
});

app.listen(PORT, HOST, () => {
	console.log(`Server running at ${HOST}:${PORT}`);
});