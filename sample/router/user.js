// import 
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth")
const bcrypt = require("bcrypt");

// Registeration page
router.get("/register", async(req,res)=>{
    res.render("userregister");
})

// registering user data
router.post("/registerData", async(req,res)=>{
    const {name,email,phone,password}= req.body;
    const passwordHash = await bcrypt.hash(password, 10)
    const data = await User.create({
        name : name,
        email : email,
        phone : phone,
        password : passwordHash
    })
    res.redirect("/user/login")
})

//Login page
router.get("/login", async(req,res)=>{
    res.render("userlogin")
})

//Login Functionality
router.post("/loginData", async(req,res)=>{
    const {email,password}=req.body;
    const data = await User.findOne({email:email})
    if(!data){
        return res.redirect("/user/login")
    }
    const match = await bcrypt.compare(password,data.password)
    if(!match){
        return  res.redirect("/user/login")
    }
    req.session.Userid=data._id;
    req.session.name=data.name;
    console.log("Logged User ID:", req.session.Userid);
    console.log("Logged User Name:", req.session.name);
    res.redirect("/product/display")
    
})

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send("something wrong")
            return
        }
    })
    return res.redirect("/product")
})

module.exports=router

