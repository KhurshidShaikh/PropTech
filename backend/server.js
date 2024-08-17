require("dotenv").config()
const express=require("express");
const app=express();
const authRoute=require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cron=require("node-cron")
const deleteUnverified=require("./utils/deleteUnverified")

app.use(express.json())
app.use(cookieParser())

cron.schedule('*/10 * * * *',()=>{
    deleteUnverified()
})

app.use("/api/auth",authRoute)



app.get("/",(req,res)=>{
    res.send("server running")
})
app.listen(3000)
