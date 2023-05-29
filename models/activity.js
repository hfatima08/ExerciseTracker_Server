const mongoose = require('mongoose')
const {Schema} = mongoose

const activitySchema = new Schema({
    activityName: String,
    date: Date,
    duration: String,
    description: String
})

const activityModel = mongoose.model('Activities', activitySchema);

module.exports = activityModel;