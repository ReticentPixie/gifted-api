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
// the noteSchema is an example of an embedded schema

const noteSchema = new Schema ({
    content: String,
    createdBy: String,              // our logged in user
}, { timestamps: true });


const transactionSchema = new Schema ({
    eventId: {type: String, required: true},
    giftId: {type: String, required: true},
    recipientId: {type: String, required: true},
    date: Date,
    managedBy: String,              // this is the uid from google firebase for authentication purposes
    notes: [noteSchema]
    // TODO: fix the below to be able to add a default value
    // notes: {
    //     type: noteSchema,
    //     default: []
    // }
}, { timestamps: true }
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('Transaction', transactionSchema)