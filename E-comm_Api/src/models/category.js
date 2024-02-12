import mongoose from "mongoose";


const category = new mongoose.Schema({
    name:{
     type : String,
     require: true
    }
},{timestamps:true})