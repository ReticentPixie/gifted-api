// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const Transactions = require('../models/transaction')       // require relevant model
const router = express.Router();                            // create router object

// =======================================
//              ROUTES
//          Follow INDUCES
// =======================================
// ----- INDEX Route -----
router.get('/', async (req, res) => {
    try {
        // res.json(await Transactions.find({}).populate(`eventId`));
        Transactions.find({}).populate('eventId').exec((err, foundTransactions) => {
            res.json(foundTransactions) 
        });

    } catch (error) {
        res.status(401).json({message: 'Login required to continue'})
    }
})

// ----- DELETE Route -----
router.delete('/:id', async (req, res) => {
    try {
        res.json(await Transactions.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// TODO ----- UPDATE ROUTE -----

// ----- Create Route -----
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        res.json(await Transactions.create(req.body))
    } catch (error) {
        res.status(401).json({message: 'Login required to continue'})
    }
})

// EXAMPLE of how to do an embedded schema
// this is a nested resource route
router.post('/:id/notes', async (req, res) => {
    try {
       const transaction = await Transctions.findById(req.params.id);
       transaction.notes.push(req.body);            // pushes the data into the notes array in memory only
       await transaction.save();                    // saves the data to persist the changes in mongoDB
       res.json(transaction);
    } catch (error) {
        res.status(401).json({message: 'Something went wrong.'})
    }
})


// =======================================
//         EXPORT ROUTER OBJECT
// =======================================
module.exports = router