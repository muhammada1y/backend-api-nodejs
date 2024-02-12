import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
     name:{
        type: String,
        unique: true,
        required:true,
        lowerCase:[true,"usin lowCase alphabet"]
     },
     email:{
        type: String,
        unique: true,
        require:true
     },
     password:{
        type: String,
        unique: true,
        require:true
     },
     role:{
       type: String,
       enum:['user','admin'],
       default: "user"
     },
     authSource:{
       type:String,
       enum: ['self','google','facbook'],
       default:'self'

    }
}
)
export const UserSchema = mongoose.model("user",User)