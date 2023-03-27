//import mongoose module
const mongoose=require("mongoose");

//create user schema
const userSchema = mongoose.Schema(
    {
        firstName : String ,
        lastName : String ,
        email : String,
        pwd : String ,
        avatar:String
    }
)
////create user model

const user=mongoose.model("Users", userSchema);
//make user exportable
module.exports=user;