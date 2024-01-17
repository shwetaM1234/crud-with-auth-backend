const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
var backend= require("./router/index")

var app= express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname))
app.use("/backend", backend)

module.exports= {app};