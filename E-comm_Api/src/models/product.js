import mongoose from "mongoose";

const product = new mongoose.schema(
    {
     discription :{
        required:true,
        type:String
     },
     name:{
        type: String,
        required:true
     },
     productImage:{
        type:String
     },
     price:{
        type: Number,
        default:0
     },
     stock:{
       default:0,
       type:Number
     },
     category:{
        type:mongoose.schema.Types.ObjectId,
        ref:"category"
     },
     onwner:{
        type: mongoose.schema.Types.ObjectId,
        ref: "User"
     }

    },
    {timestamps: true}
)

export const Products = mongoose.model('Product',product)