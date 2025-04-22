import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  amount: Number,
  description: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', TransactionSchema);