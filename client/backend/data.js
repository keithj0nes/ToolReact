const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema(
    {
        id: String,
        toolNumber: String,
        description: String,
        usedCount: Number,
        checkOut: Boolean,
        broken: Boolean,
        missing: Boolean,
        comments: String,

    },
    { timestamps: true }
);

module.exports = mongoose.model('Tools', toolSchema);