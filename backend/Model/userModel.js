const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    salary: {
        type: String,
        required: false
    },
    total_salary_with_OT: {
        type: String,
    },
})
module.exports = mongoose.model("UserModel", userSchema)