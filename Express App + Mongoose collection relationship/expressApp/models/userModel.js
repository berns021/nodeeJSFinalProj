const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  emailAddress: {
    required: true,
    type: String
  },
  userLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserLog' }] // the ref should be the name of the Model (UserLog)
});

module.exports = mongoose.model('User', userSchema);
