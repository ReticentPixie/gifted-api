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
const recipientSchema = new Schema ({
    name: String,
    birthday: String,
    age: Number,
    gender: String,
    // TODO: add embedded schema for likes: [likesSchema]
    // TODO: add embedded schema for dislikes: [dislikesSchema]
    // TODO: add transactions
    managedBy: String   // <= the google firebase user's uid number
}, { timestamps: true }
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('Recipient', recipientSchema)