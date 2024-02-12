import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"product"
    },
    quantity:{
      type:Number,
      required:true,
    }
})

const order = new mongoose.Schema(
    {
        orderPrice: {
            type: Number,
            require: true
        },
        costomer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        orderItems:{
            type:[orderItemSchema],
            require:true
        },
        status:{
            enum:["pending","cancelled","delivered"],
            default:"pending"
        }

    },
    { timestamps: true })

export const Order = mongoose.model("Order", order)