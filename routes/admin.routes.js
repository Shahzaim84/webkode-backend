import express from "express";
import { createAdminCont, createUserCont, subscriptionCancelCont, getAllUserCont, tokenVerify } from "../controllers/admin.controller.js";
import { checkAdminTokenVerify } from "../middlewares/checkAuth.js";
import { validateRegitser, validateCreateUser, validateSubscriptionCancel } from "../middlewares/Validation/adminvalidate.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    res.send("Done")
})

router.get("/users", checkAdminTokenVerify, getAllUserCont);
router.post("/register", validateRegitser, createAdminCont);
router.post("/subscription/cancel", validateSubscriptionCancel, subscriptionCancelCont);
router.post("/createuser", checkAdminTokenVerify, validateCreateUser, createUserCont);
// router.get("/logs", checkAdminTokenVerify, otpResendAccountVerified);
router.get("/token-verify", checkAdminTokenVerify, tokenVerify);

export default router;
