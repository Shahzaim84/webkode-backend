import mongoose from "mongoose";

const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }, 
    balance: {
        type: Number,
        default: 500
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('account', AccountSchema);