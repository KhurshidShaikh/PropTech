require("dotenv").config()
const express=require("express");
const router=express.Router();
const userModel=require("../models/user")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

router.post("/register", async(req,res)=>{
  const {username,email,password}=req.body;
   if(!username){
     return res.status(400).json({error:true,message:"username is required"})
   }

   if(!email){
     return res.status(400).json({error:true,message:"email is required"})
   }
   if(!password){
     return res.status(400).json({error:true,message:"password is required"})
   }
   
   let existinguser= await userModel.findOne({email})
   
   if(existinguser){
     return res.json({message:"user already exists"})
   }

  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt, async(err,hash)=>{
        let newUser= await userModel.create({
            username,
            email,
            password:hash
        })
    })
  })
    return res.json({message:"registration sueccessfull"})

})


router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
   if(!email){
     return res.status(400).json({error:true,message:"email is required"})
   }
   if(!password){
     return res.status(400).json({error:true,message:"password is required"})
   }

   let user= await userModel.findOne({email})
  if (!user){
    return res.json({message:"Invalid Credentials"})
  }

  bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
       let token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
         res.cookie("authToken",token,{
          httpOnly:true,
          secure: process.env.NODE_ENV === 'production',
         });

        return res.json({message:"login sucessfull"})
    }
    else{
        return res.json({message:"Invalid Credentials"})
    }
  })
    

})

router.post("/logout",(req,res)=>{
  res.clearCookie("authToken")
  return res.json({message:"logout successfully"})
})






module.exports=router