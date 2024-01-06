import app from "./app.js"
import config from "./utils/config.js";

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Category')

const app = express()
app.use(cors())
app.use(express.json())

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

mongoose.connect("mongodb+srv://rcmongoose:reignckley1008@cluster0.wopk8bh.mongodb.net/?retryWrites=true&w=majority")

app.get('/', (req, res) => {
    UserModel.find({})
    .then(category => res.json(category))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running")
})
const PORT = config.PORT || 3001;

app.listen(PORT, () => {
    console.log(`The Server is now running on PORT ${PORT}`);
});