const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;