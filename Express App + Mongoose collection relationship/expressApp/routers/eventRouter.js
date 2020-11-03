const express = require('express');
const eventController = require('../controllers/eventController');
const eventModel = require('../models/eventModel');
const {validateEvents} = require('../validator/eventValidator');

const router = express.Router();

router.post('/', validateEvents, eventController.addEvent);
router.get('/', eventController.getEevents);
router.get('/:eventId', eventController.getEevent);
router.delete('/:eventId', eventController.deleteEvent);
router.put('/:id', validateEvents, eventController.updateEvent);
router.get('/export', eventController.exportEvent);


module.exports = router;
