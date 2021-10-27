// =======================================
//              DEPENDENCIES
// =======================================
// ----- Import .env & get variables -----
require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;
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
// ----- Connection Events -----
db.on('connected', () => console.log(`MongoDB is connected to the ${db.name} on port ${db.port}`));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));
db.on('error', (error) => console.log(`MongoDB had an error of: ${error}`));


// =======================================
//          ROUTES & CONTROLLERS
// =======================================

// ----- TEST Route -----
app.get('/', (req, res) => {
    res.send('Hello out there!');
});


// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));