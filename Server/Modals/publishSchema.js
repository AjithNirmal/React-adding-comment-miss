const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    publish:
    {
        type:String,
        required:true,
    },
    time:String
})
const publishModal = mongoose.model("publishinfo",schema);
module.exports = publishModal;