const express= require("express")
// const userRouter= require("./User")
const zod= require("zod")
const jwt= require("jsonwebtoken")
const { user } = require("../db")
const JWT_SECRET = require("./config")
const router= express.Router()

const signupSchema= zod.object({
    username: zod.string(),
    password:zod.string(),
    firstName: zod.string(),
    lastName: zod.string()

})

router.post("/signup", async (req,res)=>{
    const body= req.body
    const {success}= signupSchema.safeParse(req.body)
    if(success){
        return res.json({
            msg: "Email already taken"
        })
    }
    const User= user.findOne({
        username: body.username
    })
    if(User._id){
        return res.json({
            msg: "Email already taken"
        })
    }
    
    const dbUser= await user.create(body)
    const token= jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
    res.json({
        msg: "User created",
        token:token
    })
})

module.exports=router