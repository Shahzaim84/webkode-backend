import {balance, transfer, generateInvoiceSummary, getPaginatedTransactions, dashboard} from "../services/dashboard.service.js";
import generateInvoiceSummaryPDF from '../utils/generateInvoicePDF.js';

export const dashboardCont = async (req, res) => {
  try {
    const user = req.user;
    const {balance, transactions} = await dashboard(user._id);
    res.status(200).send({status: true, message: "User Balance", balance, transactions});
  } catch (error) {
    console.log(error);
    if(error.message === "Account not Found"){
      return res.status(404).send({status: false, message: "Account not Found"})
    }
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const balanceCont = async (req, res) => {
  try {
    const user = req.user;
    const balanceT = await balance(user._id);
    res.status(200).send({status: true, message: "User Balance", account: balanceT});
  } catch (error) {
    console.log(error);
    if(error.message === "Account not Found"){
      return res.status(404).send({status: false, message: "Account not Found"})
    }
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const transferCont = async (req, res) => {
  try {
    const user = req.user;
    const {destinationId, amount} = req.body;
    console.log(destinationId)
    if(user._id.toString() === destinationId){
      return res.status(409).send({status: false, message: "Enter other user account id"})
    }
    const balance = await transfer(user._id, destinationId, amount);
    res.status(200).send({status: true, message: "Amount Transfer Successfully", balance});
  } catch (error) {
    console.log(error);
    if(error.message === "Accounts not found"){
      return res.status(404).send({status: false, message: "Account not Found"})
    }else if(error.message === "Insufficient balance"){
      return res.status(409).send({status: false, message: "Insufficient balance"})
    }
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const viewTransactions = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const data = await getPaginatedTransactions(req.user._id, page, pageSize);
    res.status(200).send({status: true, message: "User Transactions", data});
  } catch (err) {
    res.status(400).send({status: false, message: err.message });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).send({status: false, message: 'Start and end date required' });
    
    const data = await generateInvoiceSummary(req.user._id, start, end);
    const filename = `invoice_${Date.now()}.pdf`;

    const filePath = await generateInvoiceSummaryPDF(data, filename);

    res.status(200).send({ 
      status: true, 
      message: "Invoice generated", 
      data: { filePath, filename, ...data } 
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

