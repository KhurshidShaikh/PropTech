const mongoose=require("../config/db")

const userSchema=mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    posts:[

    ],
    avatar:{
        type:String,
        default:"default.png"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    otp:{
        type:String
    },
    otpExpires:{
        type:Date

    },
    isVerified:{
        type:Boolean,
        default:false
    }
    
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel;