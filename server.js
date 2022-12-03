require('dotenv').config()
const express = require("express")
const notion=require("./notion")
const app = express()


app.get("/", (req, res) => {
    res.render('index')
})
app.listen(process.env.PORT)