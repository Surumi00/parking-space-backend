
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())



mongoose.connect("mongodb+srv://shaun:ares2008@cluster0.dsyjzb7.mongodb.net/vehicle-db?appName=Cluster0").then(

    () => {
        console.log("mongodb connected")
    }

).catch((error) => {
    console.log(error)
})

const Vehicle = mongoose.model("vehicles", new mongoose.Schema(
    {
        vehicleId: String,
        ownerName: String,
        vehicleNumber: String,
        vehicleModel: String,
        vehicleBrand: String,
        vehicleType: String,
        vehicleColor: String,
        registrationDate: Date,
        ownerContactNumber: String,
        ownerEmail: String,
        parkingPassType: String,
        address: String
    }
))

app.get("/test", (req, res) => {

    res.send("hello world")
})

app.post("/add-vehicle", async (req, res) => {

    await Vehicle.create(req.body)
    res.json({ "status": "success" })
})
