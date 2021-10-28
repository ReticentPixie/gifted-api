// =======================================
//              DEPENDENCIES
// =======================================
const mongoose = require('mongoose')

// =======================================
//              SHORTCUT VARIABLE
// =======================================
const Schema = mongoose.Schema

// =======================================
//              DEFINE SCHEMA
// =======================================
const transactionSchema = new Schema ({
    eventId: {type: String, required: true},
    giftId: {type: String, required: true},
    recipientId: {type: String, required: true},
    date: Date,
    managedBy: String,              // this is the uid from google firebase for authentication purposes
}, { timestamps: true }
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('Transaction', transactionSchema)