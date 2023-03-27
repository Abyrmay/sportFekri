//import mongoose module
const mongoose=require("mongoose");
//create match schema
const playerSchema = mongoose.Schema(
    {
        Name : String ,
        lastName : String ,
        Age : Number ,
        Position : String ,
        Nbr : Number
       

    }
)
////create player model

const player=mongoose.model("Player", playerSchema);
//make player exportable
module.exports=player;