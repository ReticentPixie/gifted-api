// =======================================
//              DEPENDENCIES
// =======================================
const express = require(`express`);
const Transactions = require(`../models/transaction`)       // require relevant model
const router = express.Router();                            // create router object


// =======================================
//              ROUTES
//          Follow INDUCES
// =======================================
// ----- INDEX Route -----
router.get(`/`, async (req, res) => {
    try {
        res.json(await Transactions.find({}).populate(`eventId`).populate(`recipientId`));
    } catch (error) {
        // console.log(error)
        res.status(401).json({message: `Login required to continue`})
    }
})

// ----- DELETE Route -----
router.delete(`/:id`, async (req, res) => {
    try {
        res.json(await Transactions.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// TODO - build update route to allow edits to transactions
// ----- UPDATE ROUTE -----

// ----- Create Route -----
router.post(`/`, async (req, res) => {
    try {
        console.log(req.body)
        res.json(await Transactions.create(req.body))
    } catch (error) {
        res.status(401).json({message: `Login required to continue`})
    }
})


// =======================================
//         EXPORT ROUTER OBJECT
// =======================================
module.exports = router