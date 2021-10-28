// // =======================================
// //              DEPENDENCIES
// // =======================================
// const express = require('express')
// const Recipient = require('../models/recipient')    // require related data model
// const router = express.Router();                    // create router object

// // =======================================
// //              ROUTES
// // =======================================
// // ----- INDEX Route -----
// router.get('/', async (req, res) => {
//     try {
//         res.json(await Recipient.find({managedBy: req.user.uid}));
//     } catch (error) {
//         res.status(401).json({message: 'Please login'})
//     }
// })

// // ----- Create Route -----
// router.post('/', async (req, res) => {
//     try{
//         res.json(await Recipient.create(req.body))
//     } catch (error) {
//         res.status(401).json({message: 'Please login'})
//     }
// })

// // =======================================
// //         EXPORT ROUTER OBJECT
// // =======================================
// module.exports = router;