const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: [true, 'Applicant name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  company: {
    type: String,
    trim: true,
    default: '',
  },
  loanScheme: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['Submitted', 'Documents Verified', 'Under Review', 'Approved', 'Rejected'],
    default: 'Submitted',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)
