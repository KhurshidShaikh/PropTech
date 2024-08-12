require("dotenv").config()
const express=require("express");
const app=express();
const authRoute=require("./routes/authRoutes");
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoute)



app.get("/",(req,res)=>{
    res.send("server running")
})
app.listen(3000)
