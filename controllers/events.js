// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();   
const Events = require('../models/event')

// =======================================
//              ROUTES
//          Follow INDUCES
// =======================================
// ----- INDEX Route -----
router.get('/', async (req, res) => {
    try {
        res.json(await Events.find({}));
    } catch (error) {
        res.status(401).json({message: 'Login required to continue'})
    }
})


// =======================================
//         EXPORT ROUTER OBJECT
// =======================================
module.exports = router