const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // the ref should be the name of the Model (User)
  activity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserLog', userLogSchema);
