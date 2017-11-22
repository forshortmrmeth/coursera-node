'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.send('Will send all the leaders to you!');
    })
    .post((req, res) => {
        const { name, description } = req.body;
        res.end(`Will add the leader: ${name} with details: ${description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res) => {
        res.end('Deleting all leaders');
    });

leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end(`Will send details of the leader: ${req.params.leaderId} to you!`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /leaders/${req.params.leaderId}`);
    })
    .put((req, res, next) => {
        const { name, description } = req.body;
        res.write(`Updating the leader ${req.params.leaderId}`);
        res.end(`Will update the leader: ${name} with details: ${description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting the leader: ${req.params.leaderId}`);
    });

module.exports = leaderRouter;
