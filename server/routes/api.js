// Require express and create a router
const express = require('express');
const router = express.Router();


// Require your controller
// const db = ...
const db = require('../controllers/dbController');


// Wire each of the following routes to its controller method:
// GET    /tasks         => db.getTasks
router.get('/tasks', db.getTasks);

// POST   /tasks         => db.addTask
router.post('/tasks', db.addTask);

// PATCH  /tasks/:id     => db.toggleTask
router.patch('/tasks/:id', db.toggleTask);

// DELETE /tasks/:id     => db.deleteTask
router.delete('/tasks/:id', db.deleteTask);

// Export the router
module.exports = router;