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
const giftSchema = new Schema({
    name: { type: String, required: true, unique: true },
    referenceUrl: String,
}, { timestamps: true },
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('gift', giftSchema)