const moongose = require('../db/conn');
const { Schema } = moongose;

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image : {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
    )
)

modelu.exports = User;