import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "https://res.cloudinary.com/dtepgit65/image/upload/v1744490854/Ridee/Default/profileimage.png "
    },
    role: {
        type: String,
        enum: ["Developer", "Admin"],
        required: true
    },
    verified:{
        type: Boolean,
        default: false 
    },
    changePassword:{
        type: Boolean,
        default: false
    },
    verifiedToken:{
        type: String
    },
    verifiedTokenExpiresAt:{
        type: String
    },
    verifiedPasswordToken:{
        type: String
    },
    verifiedPasswordTokenExpiresAt:{
        type: String
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    subscriptionType: {
        type: String,
        enum: ["Basic", "Standard", "Premium"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastlogin:{
        type: Date
    }
});

export default mongoose.model('user', userSchema);