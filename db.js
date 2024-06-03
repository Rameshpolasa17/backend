const mongoose= require("mongoose")

mongoose.connect("mongodb://localhost:27017/paytm")

const userSchema= mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const user= mongoose.model("user", userSchema)

module.exports={
    user
}