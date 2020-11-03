const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
 // event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // the ref should be the name of the Model (User)
 memberName: {
    required: true,
    type: String
  },
  memberJoinDate: {
    required: true,
    type: Date
  },
  status: {
    required: true,
    type: Boolean
  }
});

module.exports = mongoose.model('Members', MemberSchema);
