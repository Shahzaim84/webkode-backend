import userModel from "../models/user.model.js";
import AccountModel from "../models/account.model.js";
import TransactionModel from "../models/transaction.model.js";
import generateToken from "../utils/generateToken.js";

export const dashboard = async (userId) => {
  const account = await AccountModel.findOne({userId});
  if(!account){
   throw new Error("Account not Found")
  }
   const balance = account.balance;
   const query = {
    $or: [{ sourceId: userId }, { destinationId: userId }]
  };
  const transactions = await TransactionModel.find(query)
  .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order to get the latest transactions
  .limit(4); // Limit to the last 4 transactions
   return {balance, transactions};
};

export const balance = async (userId) => {
   const account = await AccountModel.findOne({userId});
   if(!account){
    throw new Error("Account not Found")
   }
    const balance = account;
    return balance;
};

export const transfer = async (sourceId, destinationId, amount) => {
    const source = await AccountModel.findOne({ userId: sourceId });
    const dest = await AccountModel.findOne({ userId: destinationId });
  
    if (!source || !dest) throw new Error("Accounts not found");
  
    const amt = Number(amount); // make sure amount is number
    if (isNaN(amt) || amt <= 0) throw new Error("Invalid amount");
  
    const sourceBal = Number(source.balance);
    const destBal = Number(dest.balance);
  
    if (sourceBal < amt) throw new Error("Insufficient balance");
  
  
    // Update balances
    source.balance = sourceBal - amt;
    dest.balance = destBal + amt;

    source.lastUpdated = new Date();
    dest.lastUpdated = new Date();
  
    await source.save();
    await dest.save();
  
    await TransactionModel.create({
      sourceId,
      destinationId,
      amount: amt,
      description: `Transfer from ${sourceId} to ${destinationId}`
    });
  
    return source.balance;
  };
  

  export const getPaginatedTransactions = async (userId, page, pageSize) => {
    const account = await AccountModel.findOne({ userId });
    if (!account) {
      console.log('Account not found');
      throw new Error('Account not found');
    }
  
    const parsedPage = parseInt(page) || 1;  
    const parsedPageSize = parseInt(pageSize) || 10; 
  
    if (parsedPage <= 0) throw new Error('Invalid page number');
    if (parsedPageSize <= 0) throw new Error('Invalid page size');
    
    const skip = (parsedPage - 1) * parsedPageSize;
  
    const query = {
      $or: [{ sourceId: userId }, { destinationId: userId }]
    };
  
    const transactions = await TransactionModel.find(query)
      .sort({ timestamp: -1 })  // Sort by timestamp in descending order
      .skip(skip)  // Skip the calculated number of records
      .limit(parsedPageSize);  // Limit results to pageSize
  
  
    const total = await TransactionModel.countDocuments(query);
    
    const totalPages = Math.ceil(total / parsedPageSize);
  
    return {
      total,
      page: parsedPage,
      pageSize: parsedPageSize,
      totalPages,  // Return totalPages so it can be used in frontend pagination
      transactions
    };
  };
  
  
  export const generateInvoiceSummary = async(userId, start, end) => {
    const account = await AccountModel.findOne({ userId });
    if (!account) throw new Error('Account not found');
  
    const from = new Date(start);
    const to = new Date(end);
    if (isNaN(from) || isNaN(to)) throw new Error('Invalid date format');
  
    const transactions = await TransactionModel.find({
      $and: [
        {
          $or: [
            { sourceId: userId },
            { destinationId: userId }
          ]
        },
        {
          timestamp: { $gte: from, $lte: to }
        }
      ]
    });
  
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  
    return {
      start,
      end,
      totalTransactions: transactions.length,
      totalAmount,
      transactions
    };
  }