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
		console.log(req.body);
		res.send('POST REQUEST');
	});

dishRouter.route('/:dishId')
	.all((req, res, next) => {
		console.log('GETTING INFO...');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res, next) => {
		res.end(JSON.stringify(req.params));
	});

module.exports = dishRouter;
