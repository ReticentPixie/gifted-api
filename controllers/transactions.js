// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express')
const Transactions = require('../models/transaction')       // require relevant model
const router = express.Router();                            // create router object

// =======================================
//              ROUTES
//          Follow INDUCES
// =======================================
// ----- INDEX Route -----
router.get('/', async (req, res) => {
    try {
        res.json(await Transactions.find({}));
    } catch (error) {
        res.status(401).json({message: 'Login required to continue'})
    }
})

// TODO ----- DELETE Route -----
// TODO ----- UPDATE ROUTE -----

// ----- Create Route -----
router.post('/', async (req, res) => {
    try {
        res.json(await Transactions.create(req.body))
    } catch (error) {
        res.status(401).json({message: 'Login required to continue'})
    }
})


// =======================================
//         EXPORT ROUTER OBJECT
// =======================================
module.exports = router