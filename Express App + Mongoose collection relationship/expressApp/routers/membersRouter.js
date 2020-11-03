const express = require('express');
const memberController = require('../controllers/membersController');
const eventModel = require('../models/membersModel');
const {validateMember} = require('../validator/memberValidator');

const router = express.Router();

router.post('/',validateMember, memberController.addMember);
router.get('/', memberController.getMembers);
router.get('/:memberId', memberController.getMember);
router.delete('/:memberId', memberController.deleteMember);
router.put('/:memberId', validateMember, memberController.updateMember);

module.exports = router;
