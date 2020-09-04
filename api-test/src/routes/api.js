'use strict'

const express = require('express');
var ApiController = require('../controllers/api');

const api = express.Router();

// Login user
api.post('/login', ApiController.loginUser);

// Add user
api.post('/add', ApiController.addUser);

module.exports = api;