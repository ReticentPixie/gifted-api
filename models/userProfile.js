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
const userProfileSchema = new Schema ({
    googleUserID: { type: String, required: true },
    recipients: Schema.Types.ObjectId,
}, { timestamps: true }
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('userProfile', userProfileSchema)