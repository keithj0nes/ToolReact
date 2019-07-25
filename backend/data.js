const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema(
    {
        toolNumber: String,
        description: String,
        usedCount: Number,
        checkOut: Boolean,
        broken: Boolean,
        missing: Boolean,
        notes: [String],
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

    },
    { timestamps: true }
);

module.exports = mongoose.model('Tools', toolSchema);