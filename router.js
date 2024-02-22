//
// router.js
//
// Created by Caleb on 2024-02-21
//

// Import libraries
const router = require('express').Router();

// Import other content
const links = require('./routes/links');

// Configuration
router.use('/links', links);

// Export the module(s)
module.exports = router;
