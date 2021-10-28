// =======================================
//      DEPENDENCIES & CONFIGURATIONS
// =======================================
// ----- Import .env & get variables -----
require('dotenv').config()
const { PORT = 3001, DATABASE_URL } = process.env      // destructured for ease; uses port 3001 to avoid issues with frontend on Heroku
// ----- Import & Initialize Express -----
const express = require('express')
const app = express()
// ----- Other Imports -----
const mongoose = require('mongoose')       // to connect with MongoDB
const logger = require('morgan')           // aides in development by logging http request to console
const cors = require('cors')               // will eanable cross-origin resource sharing
// ----- Controllers -----
const recipientController = require('./controllers/recipients')
// ----- Google Firebase Authorization -----
const admin = require('firebase-admin')
const serviceAccount = require('./gifted-97cf7-firebase-adminsdk-in0qi-74d39a9f03.json')


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
// ----- Authorization Middleware -----
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(async function(res, res, next) {
    const token = req.get('Authorization')
    // console.log(token)  // just to see if we've accessed it
    const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
    // console.log(authUser)   // just to see what we get back
    req.user = authUser;
    // call next() to ensure the app continues to move to the next pieces of code
    next();
})

// router auth middleware function - will test that authUser in req.User
function isAuthenticated(req, res, next) {
    if (req.user) return next();
    else res.status(401).json({message: 'unauthorized'})
}

// =======================================
//          ROUTES & CONTROLLERS
// =======================================

// ----- TEST Route -----
app.get('/api', (req, res) => {
    res.json('Welcome to the Gifted API');
});

// ----- TODO Add remaining controllers

// ----- RECIPIENT CONTROLLER -----
// mount the router middleware (isAuthenticated) as a gate to the routes in this controller
app.use('/api/recipients', isAuthenticated, recipientController)



// ----- Catch All Route -----
// allows catching of requests for routes that are not found
app.get('/api/*', (req, res) => {
    res.status(404).json({message: 'That route was not found'})
})


// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));