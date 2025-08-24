const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
app.use('/api/jobs', jobsRouter);
app.use('/api/auth', authRouter);

// test route
app.get('/', (req, res) => res.send('API is working!'));

// db + server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('DB connection error:', err));
