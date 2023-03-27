//import express module
const express = require("express");
//import body-parser
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const authenticate= require("./middelware/authenticate");
//import mongoose
//sportAbyrDB Data Base Name
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/sportAbyrDB');
//import Les Model
const Match = require("./models/match");

const Player = require("./models/player");
const User = require("./models/user");
const Team = require("./models/team");


let matchesTab = [];
//Creates an Express application BE
const app = express();


//send JSON responses
app.use(bodyParser.json());

//get obj from request
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
//avatares => shortcut
//backend/images => original path
app.use('/avatars', express.static(path.join('backend/images')))

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
    cb(null, imgName);
  }
});



//Simulate DB


//app.MethodeHTTP("/path",(req,res)=>{});
//MATCHES
//Business Logic : Add Match
app.post("/matches", (req, res) => {

  let match = new Match({
    scoreOne: req.body.scoreOne,
    scoreTwo: req.body.scoreTwo,
    teamOne: req.body.teamOne,
    teamTwo: req.body.teamTwo,
  });
  console.log(match);
  //save

  match.save();
  res.json({ message: "Added with success" });

});

//Business Logic : EDIT MatchES
app.put("/matches", (req, res) => {

  console.log("Here BL:Edit Matches");
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then(
    (editResponse) => {
      console.log(editResponse);
      if (editResponse.modifiedCount == 1) {
        res.json({ message: "Match edited" })

      }
    })
});
//Business Logic : GET Match By ID
app.get("/matches/:id", (req, res) => {

  console.log("Here BL:GET By ID");
  let id = req.params.id;
  console.log('here id', id);
  let match = {};
  Match.findOne({ _id: id }).then((doc) => {
    res.json({ findedMatch: doc });
  });

});

//Business Logic : DElet By ID
app.delete("/matches/:id", (req, res) => {

  console.log("Here BL:Delete By ID");
  let id = req.params.id;
  console.log('here id', id);
  for (let index = 0; index < matchesTab.length; index++) {
    if (matchesTab[index].id == id) {
      matchesTab.splice(index, 1);
      break;
    }
  }
  res.json({ message: `Match Num ${id} is deleted ` });
});



//PLAYERS
app.post("/players/add", (req, res) => {
  let player = new Player(
    {
      Name: req.body.name,
      lastName: req.body.lastName,
      Age: req.body.age,
      Position: req.body.position,
      Nbr: req.body.nbr
    }
  );
  console.log(player);
  //save

  player.save();
  res.json({ message: "Added with success" });

  console.log("Here BL:Add players");
});
//Business Logic : GET ALL players

app.get("/players" , (req, res) => {
  console.log("Here BL : Get All Players");
  Player.find().then((data) => {
    res.json({ players: data, message: "OK!" });
  })
});

// Busines logic : Get All Matches
app.get("/matches",authenticate, (req, res) => {
  console.log("Here BL : Get All Matches");
  Match.find().then((data) => {
    res.json({ matches: data, message: "OK!" });
  })
});



//Business Logic : GET  player By ID
app.get("/players/:id", (req, res) => {

  console.log("Here BL:GET By ID");
  let id = req.params.id;
  console.log('here id', id);
  let player = {};
  Player.findOne({ _id: id }).then((doc) => {
    res.json({ findedPlayer: doc });
  });

});
//Business Logic : DElet By ID
app.delete("/players/:id", (req, res) => {

  console.log("Here BL:players By ID");
});
//Users
app.post("/players", (req, res) => {

  console.log("Here BL:Add users");
});
//Business Logic : GET ALL users
app.post("/users", (req, res) => {
  res.json({ matches: date, message: "Ok" });

  console.log("Here BL:Get users");
});
//Business Logic : GET ALL MatchES
app.put("/users", (req, res) => {

  console.log("Here BL:Edit users");
});
//Business Logic : Serach
app.post("/matches/search", (req, res) => {

  let search = req.body;
  console.log(search);
  //save
  res.json({ message: "Added with success" });
  let findedMatch = [];
  for (let index = 0; index < matchesTab.length; index++) {

    if (matchesTab[index].scoreOne == req.body.scoreOne && (matchesTab[index].scoreOne == req.body.scoreTwo)
    ) {
      findedMatch.push(matchesTab[index]);
    }
  }
  res.json({ matches: findedMatch });
});

//Bussiness Logic : Signup

app.post("/users/subscription", multer({ storage: storageConfig }).single('img'), (req, res) => {
  console.log("Here into signup", req.body);
  bcrypt.hash(req.body.pwd, 8).then(
    (cryptedPwd) => {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: cryptedPwd,
        role: req.body.role,
        avatar: `http://localhost:3000/avatars/${req.file.filename}`
      });
      user.save();
      res.json({ message: " user added" });
    }
  )
});


// Business Logic : login user
app.post("/users/signin", (req, res) => {
  let user =req.body ;
  let findedUser  ;
  User.findOne({email:user.email}).then(
    (doc)=>
    {
      findedUser=doc ;
      console.log("Here serarched object By email",doc);
      if (!doc) {
        res.json({message:"0"})
      }
    return  bcrypt.compare(user.pwd,doc.pwd);
    })
    .then(
      (pwdResult)=>
    {
      if (!pwdResult) {
        res.json({message:"1"})
      } else {
        const token = jwt.sign(
          {
          email: findedUser.email,
          userId: findedUser._id,
          userRole: findedUser.role,
          },
          "Testing" ,
          { expiresIn: "1min" }
          );
          let userToSend = {
          id: findedUser._id,
          firstName: findedUser.firstName,
          lastName: findedUser.lastName,
          role: findedUser.role,
          jwt: token,
          expiresIn: 60,
          };
       
        res.json({message:"2" , obj:userToSend})
      }
    })
});


//
//Business Logic :Add team
app.post("/teams", (req, res) => {
  console.log("Our BL add team", req.body);
  let teamObject = new Team({
    //attribut Model : valeur objet  du FE
    TeamName: req.body.name,
    TeamStadium: req.body.stadium,
    TeamOwner: req.body.owner,
    TeamFoundation: req.body.foundation,
  });
  //save methode predefine pour save l'objet fel collection
  teamObject.save((err, doc) => {
    console.log('error', err);
    if (err) {
      res.json({ message: "NOT OK!" })
    } else {
      res.json({ message: "OK!" })

    }
    //  (err)?res.json({ message: "NOT OK!" }):res.json({ message: "OK!" }) //opérateur ternaire (?:)
  });

});


// Busines logic : Get All tEAMS
app.get("/teams", (req, res) => {
  console.log("Here BL : Get All teams");
  Team.find().then((data) => {
    res.json({ teams: data, message: "OK!" });
  })
});
//Business Logic : DElet Team By ID
app.delete("/teams/:id", (req, res) => {

  console.log("Here BL:Delete Teams By ID");
  let id = req.params.id;
  console.log('here id', id);
  Team.deleteOne({ _id: id }).then(
    (deleteResponse) => {
      console.log(deleteResponse);
      if (deleteResponse.deletedCount == 1) {


        res.json({ message: "Tfassakh" });
      }
    }
  );
});

//Business Logic : GET Team By ID
app.get("/teams/:id", (req, res) => {

  console.log("Here BL:GET Team By ID");
  let id = req.params.id;
  console.log('here id', id);
  let team = {};
  Team.findOne({ _id: id }).then((doc) => {
    res.json({ findedTeam: doc });
  });

});
//Business Logic : Search



//make app importable from another files
module.exports = app;
