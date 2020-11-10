
const eventModel = require('../models/eventModel');

exports.addEvent = async function (req, res) {
    try {

    const newEvent = new eventModel(req.body);

    await newEvent.save();

      res.sendStatus(201);
    } catch (e) {
      
    }
  };
  
  // get all events
  exports.getEevents = async function (req, res) {
    // query users with userLogs with 1 filtered property (activity)
    const users = await eventModel.find({});
  
    res.send(users);
  };

    // get all event by ID
  exports.getEevent = async function (req, res) {
        // query users with userLogs with 1 filtered property (activity)
        const id = req.params.eventId;
      
        console.log(id);

        const event_ = await eventModel.findById(id);
      
        res.send(event_);
  };

      // delete by ID
  exports.deleteEvent = async function (req, res) {
        try {
          const id = req.params.eventId;
      
          await eventModel.findByIdAndDelete(id);
      
          res.sendStatus(200);

        } catch (e) {
          next(e);
        }
  };

  //Update Event
exports.updateEvent = async function (req, res, next) {
    try {
      const id = req.params.id;
  
      await eventModel.findByIdAndUpdate(id, req.body);
  
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
    
  //Export Event
exports.exportEvent = async function (req, res, next) {
    try {
      let newEvent={};
      const query = req.query;// query = {sex:"female"}
      // query user with userLogs with 1 filtered property (activity)
      const event = await eventModel.find({ _id: query.eventId })
      .populate({ 
        path: 'MemberAttendance',
        populate: {
          path: 'member',
          model: 'Members',
          select: 'Name'
        } 
     });
     newEvent=await normalizeData(event,true);
      res.send(newEvent);
  
      let xls= json2xls(newEvent);
      fs.writeFileSync(event[0].eventName+ '_EventStartDateTime' + '.xlsx', xls, 'binary');
    } catch (e) {
      next(e);
    }
  };

  async function normalizeData(event, isExport) {  
    let newObj={};
    let memberAttendance=[];
      for (let i=0; i<event[0].MemberAttendance.length; i++) {
        if (isExport){
          newObj= {
            'MemberName': event[0].MemberAttendance[i].member.Name,
            'Time-in': event[0].MemberAttendance[i].timeIn,
            'Time-out': event[0].MemberAttendance[i].timeOut
         };
        }
        else{
          newObj= {
            'MemberId': event[0].MemberAttendance[i].member._id,
            'MemberName': event[0].MemberAttendance[i].member.Name,
            'Time-in': event[0].MemberAttendance[i].timeIn,
            'Time-out': event[0].MemberAttendance[i].timeOut
         };
        }
      
        memberAttendance.push(newObj);
    }
     return memberAttendance;
    }