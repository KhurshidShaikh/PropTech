require("dotenv").config()
const express=require("express");
const http = require("http");
const socketIo = require("socket.io");
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

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
      origin: 'http://localhost:5173', // Allow your frontend origin
      methods: ["GET", "POST"],
      credentials: true // Allow credentials if needed
  }
});



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


io.on("connection",(socket)=>{

  socket.on("client",(arg)=>{
    console.log(arg);
  })

})












server.listen(3100, () => {
  console.log("Server is running on port 3100");
});