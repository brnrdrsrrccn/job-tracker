const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  // store a date-only style deadline (we'll parse safely below)
  deadline: { type: Date, default: null },

  dateApplied: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
