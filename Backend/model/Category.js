const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    Number: Number,
    Category: String, 
})

const categoryModel = mongoose.model("category", userSchema)
module.exports = UserModel