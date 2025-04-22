import express from "express";
import { paymentCont, susbcribeCont , susbcribeCancelCont} from "../controllers/subscription.controller.js";
import { validatePayment, validateSubscribe} from "../middlewares/Validation/subscriptionvalidate.js";
import { checkTokenVerifySubscription, checkTokenVerify } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    res.send("Done")
})

router.post("/payment", validatePayment, checkTokenVerifySubscription, paymentCont);
router.post("/subscribe", validateSubscribe, checkTokenVerifySubscription, susbcribeCont);
router.post("/cancel", checkTokenVerify, susbcribeCancelCont);

export default router;
