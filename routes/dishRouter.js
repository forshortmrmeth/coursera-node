'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.all((req, res, next) => {
		console.log('ALL route');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res) => {
		res.send('Will send all the dishes to you.');
	})
	.post((req, res) => {
		console.log(req);
		res.send('GET REQUEST');
	});

module.exports = dishRouter;
