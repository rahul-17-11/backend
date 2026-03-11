const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  type: {
    type: String,
    enum: ['Call', 'Email', 'Meeting', 'Note'],
    required: [true, 'Activity type is required'],
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
  date: {
    type: Date,
    required: [true, 'Activity date is required'],
    default: Date.now,
  },
  nextActionDate: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema)
