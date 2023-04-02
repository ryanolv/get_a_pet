const moongose = require('../db/conn');
const { Schema } = moongose;

const Pet = mongoose.model(
    'Pet',
    new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean
        },
        user: Object,
        adopter: Object,
    },
    { timestamps: true },
    )
)

modelu.exports = Pet;