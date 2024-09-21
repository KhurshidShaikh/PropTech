require("dotenv").config()
const express=require("express");
const app=express();
const authRoute=require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cron=require("node-cron")
const deleteUnverified=require("./utils/deleteUnverified")
const cors = require('cors');
const userRoute=require("./routes/userRoutes")
const postRoute=require("./routes/postRoutes")
const chatRoute=require("./routes/chatRoutes")
const messageRoute=require("./routes/messageRoutes")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));



cron.schedule('*/10 * * * *',()=>{
    deleteUnverified()
})

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)


app.get("/",(req,res)=>{
    res.send("server running")
})
app.listen(3100)
