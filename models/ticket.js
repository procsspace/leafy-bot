const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    category: String,

    messages: [{
        id: String,
        content: String,
        author: {
            id: String,
            username: String,
            discriminator: String,
            avatar: String,
        },
        timestamp: String,
        embeds: Array,
        attachments: Array,

    }],

    author: {
        id: String,
        username: String,
        discriminator: String,
        avatar: String,
    },

    staff: [
        {
            id: String,
            username: String,
            discriminator: String,
            avatar: String,
        }
    ],

    date: String,
})

module.exports = mongoose.model("ticket", ticketSchema);
