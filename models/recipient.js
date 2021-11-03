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

// ---------- Embedded LIKES ----------
const noteSchema = new Schema ({
    content: String,
    createdBy: String,              // our logged in user
}, { timestamps: true });


// ---------- PRIMARY Recipient ----------
const recipientSchema = new Schema ({
    name: String,
    birthday: Date,
    age: Number,
    gender: String,
    likes: [noteSchema],
    dislikes: [noteSchema],
    transactions: {type: Schema.Types.ObjectId, ref:`Transaction`},
    managedBy: String   // <= the google firebase user's uid number
}, { timestamps: true }
)

// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model('Recipient', recipientSchema)