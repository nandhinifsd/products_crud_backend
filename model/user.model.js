const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    email: {
        required: true,
        unique: true,
        type:String,
    },
    password: {
        type: String,
        required:true
    },
    role:{
        required:true,
        type:String,
    }
})

const user = mongoose.model("users_new", userSchema);

module.exports = user;