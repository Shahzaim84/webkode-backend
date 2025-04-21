import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connecttomongodb = ()=>{
    try{
        mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Mongo DB not connected", error);
    }
}

export default connecttomongodb;