// =======================================
//              DEPENDENCIES
// =======================================
const mongoose = require(`mongoose`)


// =======================================
//              SHORTCUT VARIABLE
// =======================================
const Schema = mongoose.Schema


// =======================================
//              DEFINE SCHEMA
// =======================================
const transactionSchema = new Schema ({
    eventId: {type: Schema.Types.ObjectId, ref:`Event`, required: true},
    giftId: {type: String, required: true},
    recipientId: {type: Schema.Types.ObjectId, ref:`Recipient`, required: true},
    date: Date,
    managedBy: String,          // this is the google firebase user uid
}, { timestamps: true }
)


// =======================================
//          CONVERT & EXPORT MODEL
// =======================================
module.exports = mongoose.model(`Transaction`, transactionSchema)