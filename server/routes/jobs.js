const express = require('express');
const Job = require('../models/job');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Create Job (only logged-in users)
router.post('/', authMiddleware, async (req, res) => {
  const { company, position, status, deadline, notes } = req.body;

  try {
    const newJob = new Job({
      company,
      position,
      status,
      deadline,
      notes,
      user: req.user // ✅ Attach logged-in user ID
    });

    await newJob.save();
    res.json(newJob);
  } catch (err) {
    console.error('Create job error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get all jobs for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user }).sort({ deadline: 1 });
    res.json(jobs);
  } catch (err) {
    console.error('Get jobs error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update job (ensure it belongs to the logged-in user)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    let job = await Job.findOne({ _id: id, user: req.user });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    console.error('Update job error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Delete job (ensure it belongs to the logged-in user)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findOne({ _id: id, user: req.user });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await Job.findByIdAndDelete(id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Delete job error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;