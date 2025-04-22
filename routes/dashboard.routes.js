import express from "express";
import { balanceCont, transferCont, getInvoice, viewTransactions, dashboardCont } from "../controllers/dashboard.controller.js";
import {validateTransfer } from "../middlewares/Validation/dashboardvalidate.js";
import { checkTokenVerify } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    res.send("Done")
})

router.get("/dashboard", checkTokenVerify, dashboardCont);
router.get("/balance", checkTokenVerify, balanceCont);
router.post("/transfer", validateTransfer, checkTokenVerify, transferCont);
router.get("/transactions", checkTokenVerify, viewTransactions);
router.get("/invoice", checkTokenVerify, getInvoice);

export default router;
