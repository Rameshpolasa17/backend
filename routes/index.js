const express= require("express")

const app= express()
const router= express.Router()

router.use("/user", userRouter)

module.exports= router;