const express = require("express");
const app = express();
const mongoose = require("mongoose");
const checkmail = require("./reuseabailtiy");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const registerModals = require("./Modals/registerSchema");
const publishModal = require("./Modals/publishSchema");
const salt = 7;
app.use(express.json())
app.use(cors());
app.listen(3001,(err)=>{
    if(!err)
    console.log("Port Started on 3001")
    else
    console.log("Port not Started")
})
mongoose.connect("mongodb://localhost/fullstack",()=>{
   console.log("DB connected");
},(err)=>{
   console.log("DB not connected");
})
app.post("/register",async(req,res)=>{
    let aj = await checkmail(req.body.email)
   // console.log(aj)
    if(aj)
    {
         res.status(402).send("Email is already registered with us")
    }
    else
    {
        bcrypt.genSalt(salt).then((hashsalt)=>{
            bcrypt.hash(req.body.password,hashsalt).then((hashedpassword)=>{
                registerModals.create({email:req.body.email,password:hashedpassword}).then((data)=>{
                    res.status(200).send({message:"New user has registered"})
                }).catch((err)=>{
                    res.status(404).send({message:"Try with different email id"})
                })
            })
           })
    }
})
app.post("/login",(req,res)=>{
  //  console.log(req.body.email)
    registerModals.find({email:req.body.email}).then((data)=>{
        if(data.length)
        {
            bcrypt.compare(req.body.password,data[0].password).then((val)=>{
                if(val)
                 res.status(200).send(req.body.email);
                 else
                 res.status(401).send("invalid password")
            })
        }
         else
         {
            res.status(401).send("invalid email")
         }
    })
})

app.post("/publish",(req,res)=>{
    let time = new Date();
    publishModal.create({publish:req.body.content,time:time}).then((data)=>{
        res.status(200).send("content has updated");
    }).catch((err)=>{
        res.send(402).send(err)
    })
})
app.get("/effect",(req,res)=>{
    publishModal.find().then((data)=>{
        res.status(200).json(data)
    }).catch((err)=>{
        res.status(402).send(err)
    })
})

