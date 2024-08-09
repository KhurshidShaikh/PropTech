const express=require("express");
const router=express.Router();

router.get("/register",(req,res)=>{
    res.send("register page")
})


router.get("/login",(req,res)=>{
    res.send("login page")
})


module.exports=router