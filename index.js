//
// index.js
//
// Created by Caleb on 2024-02-21
//

// Import libraries
const express = require('express');

// Import other content
const router = require('./router');

// Configuration
const app = express();
app.use(express.json());
app.use('/', router);
app.listen(3000); // port 3000
