//we will handle connectivity between express and mongodb 
// const mongoose=require('mongoose') --->commonjs
import mongoose from "mongoose" //-->module 
import dotenv from 'dotenv'//process all the data
dotenv.config(); //able process directly

const connectDb=()=>{
    try{
mongoose.connect(process.env.MONGODB_URI); //to connect 
console.log("db has been connected");


    }
    catch(err)
    {
        console.error(err);
    }


}
export default connectDb