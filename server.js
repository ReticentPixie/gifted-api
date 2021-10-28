// =======================================
//      DEPENDENCIES & CONFIGURATIONS
// =======================================
// ----- Import .env & get variables -----
require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;      // destructured for ease; uses port 3001 to avoid issues with frontend on Heroku
// ----- Import & Initialize Express -----
const express = require('express');
const app = express();
// ----- Other Imports -----
const mongoose = require('mongoose');       // to connect with MongoDB
const logger = require('morgan');           // aides in development by logging http request to console
const cors = require('cors');               // will eanable cross-origin resource sharing


// =======================================
//              DATABASE
// =======================================
// ----- Establish Connection -----
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
// ----- Connection Events & Listeners -----
db.on('connected', () => console.log(`MongoDB is connected to the ${db.name} on port ${db.port}`));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));
db.on('error', (error) => console.log(`MongoDB had an error of: ${error}`));


// =======================================
//          MIDDLEWARE
// =======================================
app.use(logger('dev'))          // mounts morgan to assist in development
app.use(cors());                // attaches an access-control-allow-origin header to the response to prevent the browser from blocking the response due to cross-origin resource sharing
app.use(express.json());        // allows parsing of incoming json data to create req.body


// =======================================
//          ROUTES & CONTROLLERS
// =======================================

// ----- TEST Route -----
app.get('/api', (req, res) => {
    res.json('Welcome to the Gifted API');
});

// ----- Catch All Route -----
// allows catching of requests for routes that are not found
app.get('/api/*', (req, res) => {
    res.status(404).json({message: 'That route was not found'})
})


// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));