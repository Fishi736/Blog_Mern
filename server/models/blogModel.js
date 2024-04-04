const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    category: {
        type: String, enum: ["Agricultural",
            "Bussiness",
            "Education",
            "Entertainment",
            "Art",
            "Investment",
            "Technology"], message: "{Value is not supported"
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })


module.exports = model('Blog', blogSchema);