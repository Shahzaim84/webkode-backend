import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  method: String,
  route: String,
  status: Number,
  time: String, 
}, {
  timestamps: true, 
});

const Log = mongoose.model("Log", logSchema);

export default Log;
