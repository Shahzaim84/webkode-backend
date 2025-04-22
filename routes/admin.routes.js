import express from "express";
import { createAdminCont, createUserCont, subscriptionCancelCont, getAllUserCont, tokenVerify } from "../controllers/admin.controller.js";
import { checkAdminTokenVerify } from "../middlewares/checkAuth.js";
import { validateRegitser, validateCreateUser, validateSubscriptionCancel } from "../middlewares/Validation/adminvalidate.js";
import logModel from "../models/log.model.js"

const router = express.Router();

router.get("/",async(req,res)=>{
    res.send("Done")
})

router.get("/users", checkAdminTokenVerify, getAllUserCont);
router.post("/register", validateRegitser, createAdminCont);
router.post("/subscriptions/cancel", validateSubscriptionCancel, subscriptionCancelCont);
router.post("/createuser", checkAdminTokenVerify, validateCreateUser, createUserCont);
router.get('/logs', checkAdminTokenVerify, async (req, res) => {
    try{
        const logs = await logModel.find().sort({ createdAt: -1 }).limit(100);
        res.status(200).send({status: true, message: "Logs", logs });
    }catch(error){
        console.log(error);
        res.status(500).send({status: false, message: "Internal Server Error"});
    }
  });
router.get("/token-verify", checkAdminTokenVerify, tokenVerify);

export default router;
