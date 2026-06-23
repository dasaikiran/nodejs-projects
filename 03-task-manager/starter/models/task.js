const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: [true, "key must be 'name' and its value must be provided"],
        maxlength: [20, 'name cannot exceed 20 characters'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task',taskSchema)