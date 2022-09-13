const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const registerModals = mongoose.model("registerinfo",registerSchema);
module.exports = registerModals;