const mongoose = require("mongoose");

const Feedbackschema = new mongoose.Schema({
    customerID:{
        type: String,
        required:true,
    },
    name:{
        type: String,
    },
    feedback:{
        type: String,
        required: true,
    },
});

module.exports = Feedback = mongoose.model("feedback", Feedbackschema);
