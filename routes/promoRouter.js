'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.send('Will send all the promotions to you!');
    })
    .post((req, res) => {
        const { name, description } = req.body;
        res.end(`Will add the promotion: ${name} with details: ${description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res) => {
        res.end('Deleting all promotions');
    });

promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end(`Will send details of the promotion: ${req.params.promoId} to you!`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /promotions/${req.params.promoId}`);
    })
    .put((req, res, next) => {
        const { name, description } = req.body;
        res.write(`Updating the promotion ${req.params.promoId}`);
        res.end(`Will update the promotion: ${name} with details: ${description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting the promotion: ${req.params.promoId}`);
    });

module.exports = promoRouter;
