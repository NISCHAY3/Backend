const mongoose = require('mongoose');


const postSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    content: { // Add this field to store the post content
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]

})

module.exports = mongoose.model('post', postSchema);

