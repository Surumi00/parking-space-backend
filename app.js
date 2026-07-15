const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")


const app=express()

app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://shaun:ares2008@ac-ynbgbrp-shard-00-00.dsyjzb7.mongodb.net:27017,ac-ynbgbrp-shard-00-01.dsyjzb7.mongodb.net:27017,ac-ynbgbrp-shard-00-02.dsyjzb7.mongodb.net:27017/parking-db?ssl=true&replicaSet=atlas-ckoauw-shard-0&authSource=admin&appName=Cluster0").then(
    ()=>{
        console.log("DB connected");
        
    }
).catch(
    (error)=>{
        console.log(error);
        
    }
)

const Parking=mongoose.model("Park",new mongoose.Schema(
   {
    parkingId: Number,
    slotNumber: Number,
    parkingZone: String,
    floorNumber: Number,
    vehicleTypeSupported: String,   
    hourlyParkingFee: Number,
    availabilityStatus: String,     
    maximumParkingDuration: Number, 
    parkingAreaName: String,
    cctvAvailable: Boolean,
    reservedSlot: Boolean,
    remarks: String
}
))


app.post("/add-parking",async(req,res)=>{
   await Parking.create(req.body)
   res.json({"status":"success"})
})

app.post("/view-all",async(req,res)=>{
    const parks=await Parking.find()
    res.json(parks)
})

const Offer=mongoose.model("Offers",new mongoose.Schema(
   {
    offerId: Number,
    offerCode: String,
    offerName: String,
    offerDescription: String,
    discountPercentage: Number,
    maximumDiscountAmount: Number,
    minimumParkingFeeRequired: Number,
    validFrom: String,
    validUntil: String,
    applicableVehicleType: String,
    offerStatus: String,
    termsAndConditions: String
}
))


app.post("/add-offer",async(req,res)=>{
   await Offer.create(req.body)
   res.json({"status":"success"})
})

app.post("/view-offer",async(req,res)=>{
    const discounts=await Offer.find()
    res.json(discounts)
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



app.post("/add-vehicle", async (req, res) => {

    await Vehicle.create(req.body)
    res.json({ "status": "success" })
})

app.post("/view-vehicles", async (req, res) => {

    const vehicles = await Vehicle.find()
    res.json(vehicles)
})

app.listen(3000, () => {

    console.log("server started")
})