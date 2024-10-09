const mongoose = require("mongoose")

const connecDb = async() => {
    try{
         await mongoose.connect(process.env.MONGO_DB_CONNECTION + "/social_post");
        console.log("MongoDb connection successfull!");
    } catch(err){
        console.log("MongoDb connection failed");
    }
}

module.exports = connecDb;