const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema(
    {
        toolNumber: {type: String, index: "text"},
        description: {type: String, index: "text"},
        usedCount: Number,
        checkOut: {type: Boolean, timestamps: true},
        broken: Boolean,
        missing: Boolean,
        notes: [String],
        location: String,
        chevrolet: Boolean,
        corvette: Boolean,
        volt: Boolean,
        spark: Boolean,
        buick: Boolean,
        gmc: Boolean,
        cadillac: Boolean,
        mediumDuty: Boolean,
        essential: Boolean,
        recommended: Boolean,
        quantity: Number,
        checkedOutBy: [String]

    },
    { timestamps: true }
);

module.exports = mongoose.model('Tools', toolSchema);