
const membersModel = require('../models/membersModel');

exports.addMember = async function (req, res) {
    try {

    const newMember = new membersModel(req.body);

    await newMember.save();

      res.sendStatus(201);
    } catch (e) {
      
    }
  };
  
  // get all events
  exports.getMembers = async function (req, res) {
    // query users with userLogs with 1 filtered property (activity)
    const users = await membersModel.find({});
  
    res.send(users);
  };

    // get all event by ID
  exports.getMember = async function (req, res) {
        // query users with userLogs with 1 filtered property (activity)
        const id = req.params.memberId;
      
        console.log(id);

        const event_ = await membersModel.findById(id);
      
        res.send(event_);
  };

      // delete by ID
  exports.deleteMember= async function (req, res) {
        try {
          const id = req.params.memberId;
      
          await membersModel.findByIdAndDelete(id);
      
          res.sendStatus(200);

        } catch (e) {
          next(e);
        }
  };

  //Update Member
exports.updateMember = async function (req, res, next) {
    try {
      const id = req.params.id;
  
      await membersModel.findByIdAndUpdate(id, req.body);
  
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

    