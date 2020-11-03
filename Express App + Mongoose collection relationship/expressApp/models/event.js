const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
 // event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // the ref should be the name of the Model (User)
 eventName: {
    required: true,
    type: String
  },
  eventType: {
    required: true,
    type: String
  },
  startDate: {
    required: true,
    type: Date
  },
  endDate: {
    required: true,
    type: Date
  }
});

module.exports = mongoose.model('Event', eventSchema);
