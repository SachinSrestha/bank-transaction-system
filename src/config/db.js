const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log(`Server connected to MongoDB`)
    })
    .catch((err)=>{
        console.log(`Error connecting to DB`,err)
        process.exit(1)
    })
}

module.exports =connectDB