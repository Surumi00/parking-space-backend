


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

app.listen(3000,()=>{
    console.log("server started")
})