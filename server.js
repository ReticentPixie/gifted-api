// =======================================
//      DEPENDENCIES & CONFIGURATIONS
// =======================================
// ----- Import .env & get variables -----
require(`dotenv`).config()
const { 
    PORT=3001, 
    DATABASE_URL, 
    PRIVATE_KEY_ID, 
    PRIVATE_KEY, 
    CLIENT_ID, } = process.env              // destructured for ease; utilizes port 3001 to avoid issues with frontend deployed via Heroku
// ----- Import & Initialize Express -----
const express = require(`express`)
const app = express()
// ----- Import Modules -----
const mongoose = require(`mongoose`)       // to connect with MongoDB
const morgan = require(`morgan`)           // aides in development by logging http request to console
const cors = require(`cors`)               // will enable cross-origin resource sharing
// ----- Controllers -----
const transactionsController = require(`./controllers/transactions`)
const eventsController = require(`./controllers/events`)
const recipientsController = require(`./controllers/recipients`)
// ----- Google Firebase Authorization -----
const admin = require(`firebase-admin`)


// =======================================
//              DATABASE
// =======================================
// ----- Establish Connection -----
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
// ----- Connection Events & Listeners -----
db.on(`connected`, () => console.log(`MongoDB is connected to the ${db.name} on port ${db.port}`));
db.on(`disconnected`, () => console.log(`Disconnected from MongoDB`));
db.on(`error`, (error) => console.log(`MongoDB had an error of: ${error}`));


// =======================================
//          MIDDLEWARE
// =======================================
app.use(morgan(`dev`))                  // mounts morgan to assist in development
app.use(cors());                        // attaches an access-control-allow-origin header to the response to prevent the browser from blocking the response due to cross-origin resource sharing
app.use(express.json());                // parse incoming json data to create req.body

// ----- Authorization Middleware -----
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "gifted-97cf7",
        "private_key_id": PRIVATE_KEY_ID,
        // uses regex to write a regular expression to avoid heroku adding in extra / when parsing through the environment variable
        "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": "firebase-adminsdk-in0qi@gifted-97cf7.iam.gserviceaccount.com",
        "client_id": CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-in0qi%40gifted-97cf7.iam.gserviceaccount.com"
    })
});

app.use(async function(req, res, next) {
    const token = req.get(`Authorization`)
    if(token) {                         // check to see if a token (authorization headers) were sent with the request
        const authUser = await admin.auth().verifyIdToken(token.replace(`Bearer `, ``))
        req.user = authUser;
    }
    next();
})

// custom router auth middleware - tests that authUser is in req.User
function isAuthenticated(req, res, next) {
    if (req.user) return next();
    else res.status(401).json({message: `Unauthorized Access`})
}


// =======================================
//          ROUTES & CONTROLLERS
// =======================================
// Note - router middleware (isAuthenticated) serves as a gate to all protected routes
// TODO: add gift controller
app.get(`/api`, (req, res) => {                                                 // ----- TEST Route -----
    res.json(`Welcome to the Gifted API`);
});
app.use(`/api/transactions`, isAuthenticated, transactionsController)           // ----- Transactions Controller -----
app.use(`/api/events`, isAuthenticated, eventsController)                       // ----- Events Controller -----
app.use(`/api/recipients`, isAuthenticated, recipientsController)               // ----- Recipients Controller -----
app.get(`/api/*`, (req, res) => {                                               // ----- Catch All Route - for routes not found -----
    res.status(404).json({message: `That route was not found`})
})


// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));