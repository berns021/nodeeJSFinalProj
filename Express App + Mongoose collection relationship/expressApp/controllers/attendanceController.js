const attendanceModel = require('../models/attendanceMoodel');
const eventModel = require('../models/eventModel');
const memberModel = require('../models/membersModel');

//Insert Attendance
exports.insertAttendance = async function (req, res, next) {
    try {
        const {member, event, timeIn, timeOut} = req.body;
        const eventDoc = await eventModel.findById(event);
        const isMember = await memberModel.findById(member);

        if( !eventDoc || !isMember){
            res.sendStatus(404)
        }


        const attendanceLogDoc = new attendanceModel({
            member: member,
            event:  event,
            timeIn,
            timeOut
        });

        eventDoc.MemberAttendance.push(attendanceLogDoc._id);
        await attendanceLogDoc.save();
        eventDoc.save();
  
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  };
//Delete Attendance
  exports.deleteAttendance = async function (req, res, next) {
    try {
      const id = req.params.id;
      await attendanceModel.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
  