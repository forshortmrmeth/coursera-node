'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.send('Will send all the dishes to you!');
    })
    .post((req, res) => {
        const { name, description } = req.body;
        res.end(`Will add the dish: ${name} with details: ${description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res) => {
        res.end('Deleting all dishes');
    });

dishRouter.route('/:dishId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /dishes/${req.params.dishId}`);
    })
    .put((req, res, next) => {
        const { name, description } = req.body;
        res.write(`Updating the dish ${req.params.dishId}`);
        res.end(`Will update the dish: ${name} with details: ${description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting the dish: ${req.params.dishId}`);
    });

module.exports = dishRouter;
