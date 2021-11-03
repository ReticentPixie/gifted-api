// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express')
const Recipients = require('../models/recipient')    // require related data model
const router = express.Router();                    // create router object

// =======================================
//              ROUTES
// =======================================
// ----- INDEX Route -----
router.get('/', async (req, res) => {
    try {
        res.json(await Recipients.find({}).populate('transactions'))
    } catch (error) {
        res.status(401).json({message: 'Please login'})
    }
})

// // ----- DELETE Route -----
// router.delete('/:id', async (req, res) => {
//     try {
//         res.json(await Recipients.findByIdAndDelete(req.params.id))
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// TODO ----- UPDATE ROUTE -----

// ----- Create Route -----
router.post('/', async (req, res) => {
    try {
        res.json(await Recipients.create(req.body))
    } catch (error) {
        console.log(error)
        res.status(401).json({message: 'Please login'})
    }
})

// ----- SHOW ROUTE -----
router.get('/:id', async (req, res) => {
    try {
        res.json(await Recipients.findById(req.params.id))
    } catch (error) {
        res.status(401).json({message: 'Please login'})
    }
})

// // ========== EMBEDDED LIKES/DISLIKES ROUTES ==========
// // ----- LIKE: CREATE Route -----
// router.post('/:id/likes', async (req, res) => {
//     try {
//        const recipient = await Recipients.findById(req.params.id);
//        recipient.likes.push(req.body);            // pushes the data into the notes array in memory only
//        await recipient.save();                    // saves the data to persist the changes in mongoDB
//        res.json(recipient);
//     } catch (error) {
//         res.status(401).json({message: 'Something went wrong.'})
//     }
// })

// =======================================
//         EXPORT ROUTER OBJECT
// =======================================
module.exports = router;