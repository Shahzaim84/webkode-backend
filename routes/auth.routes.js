import express from "express";
import { register, login, otpCheckAccountVerified, otpResendAccountVerified, forgotPassword, otpCheckChangePassword, otpResendChangePassword, changePassword, tokenVerify } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin, validateOTPCheck, validateforgotPassword, validatechangePassword} from "../middlewares/Validation/Auth/validate.js";
import { checkTokenVerify, checkTokenVerifyChangePassword, checkTokenAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    res.send("Done")
})

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/otpcheck/account-verified", checkTokenAuth, validateOTPCheck, otpCheckAccountVerified);
router.get("/otpresend/account-verified", checkTokenAuth, otpResendAccountVerified);
router.post("/forgotpassword", validateforgotPassword, forgotPassword);
router.post("/otpcheck/changepassword", checkTokenAuth, validateOTPCheck, otpCheckChangePassword);
router.get("/otpresend/changepassword", checkTokenAuth, otpResendChangePassword);
router.post("/changepassword", checkTokenVerifyChangePassword, validatechangePassword, changePassword);
router.get("/token-verify", checkTokenVerify, tokenVerify);

export default router;
