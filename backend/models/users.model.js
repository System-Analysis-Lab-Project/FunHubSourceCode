const mongoose = require("mongoose")
const userRoles = require('../utils/userRolels');
const Schema = mongoose.Schema

const user = new Schema ({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    token : {type : String, required: false},
    role: {type: String, enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER], default: userRoles.USER}
},
{timestamps:true});

const User = mongoose.model("User" , user)
module.exports = User