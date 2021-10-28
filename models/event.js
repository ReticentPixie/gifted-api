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
const eventSchema = new Schema ({
    name: { type: String, required: true, unique: true },
}, { timestamps: true }
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('event', eventSchema)