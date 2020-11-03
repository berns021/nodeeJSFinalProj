const express = require('express');
const userLogController = require('../controllers/userLogController');

const router = express.Router();

router.get('/', userLogController.getUserLogs);
router.get('/user/:userId', userLogController.getUserLogsByUser);
router.get('/:id', userLogController.getUserLog);
router.post('/', userLogController.insertUserLog);
router.put('/:id', userLogController.updateUserLog);
router.delete('/:id', userLogController.deleteUserLog);
router.delete('/user/:userId', userLogController.deleteUserLogsByUser);

module.exports = router;
