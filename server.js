const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');
connectDB();

// ----------------------------------
// Routes Import
// ----------------------------------
const takhmeenForm = require('./routes/takhmeenForm');


// ----------------------------------
// Express configuration
// ----------------------------------
const app = express();
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ----------------------------------
// API Routes
// ----------------------------------
app.use('/api/v1/takhmeenForm', takhmeenForm);

// ----------------------------------
// Express server
// ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));