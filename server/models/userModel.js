const { Schema, model } = require('mongoose')



const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    mobile: { type: Number, default: 0 },
    country: { type: String },
    about: { type: String },
    interest: { type: String },
    blogs: { type: Number, default: 0 },
})


module.exports = model('User', userSchema)