const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/swiggyUsersData")
.then(()=>{
    console.log("Connected successfully");
})
.catch(()=>{
    console.log("Error in connecting to the database");
})

const Schema1=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        require:true,
        type:String
    }
})

const collection=new mongoose.model("usersdata",Schema1);

module.exports=collection;