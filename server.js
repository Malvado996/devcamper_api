const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Errorhandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, 
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.brightBlue.bold)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Unhandled Error from server.js: ${err.message}`.red.bold.underline);
    // Close server & exit process
    server.close(() => process.exit(1))
})