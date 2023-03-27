//import mongoose module
const mongoose=require("mongoose");
//create team schema
const teamSchema = mongoose.Schema(
    {
        TeamName : String ,
        TeamStadium : String ,
        TeamOwner : String ,
        TeamFoundation : Number ,   //lassmei eli bch nal9ahom fel base de donneeee //attribut el Model

    }
)
////create team model

const team=mongoose.model("Team", teamSchema);
//make team exportable
module.exports=team;