import {registerUser, loginUser, otpCheckAccountVerifiedUser, otpResendAccountVerifiedUser, forgotPasswordUser, otpCheckChangePasswordUser, otpResendChangePasswordUser, changePasswordUser} from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const userToken = await registerUser(fullname, email, password, role);
    res.status(200).send({status: true, message: "Registered Successfully", token: userToken});
  } catch (error) {
    if(error.message === "User already exists"){
      return res.status(409).send({status: false, message: error.message});
    }else if (error.message === "Please Select Correct User Role"){
      return res.status(403).send({ status:false, message: error.message });
    }
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).send({status: true, message: "Logined Successfully", token: token, user:{fullname: user.fullname, email: user.email, image: user.image}});
  } catch (error) {
    if(error.message === "Invalid Email or Password"){
      return res.status(404).send({status: false, message: error.message});
    }else if(error.message === "User is not verified"){
      return res.status(409).send({status: false, message: error.message});
    }
    console.log(error)
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const otpCheckAccountVerified = async (req, res) => {
  try {
    const {otp} = req.body;
    const user = req.user;
    const token = await otpCheckAccountVerifiedUser(user, otp);
    res.status(200).send({status: true, message: "User verified successfully", token: token});
  } catch (error) {
    if(error.message === "User is already verified"){
      return res.status(409).send({status: false, message: error.message});
    }else if(error.message === "Invalid or expired OTP"){
      return res.status(401).send({status: false, message: error.message});
    }
    console.log(error)
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
}

export const otpResendAccountVerified = async (req, res) => {
  try {
    const user = req.user;
    const token = await otpResendAccountVerifiedUser(user);
    res.status(200).send({status: true, message: "OTP Resend Successfully", token: token})
  } catch (error) {
    if(error.message === "User is already verified"){
      return res.status(409).send({status: false, message: error.message});
    }
    console.log(error)
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const token = await forgotPasswordUser(email);
    res.status(200).send({status: true, message: "OTP send successfully", token: token});
  } catch (error) {
    if(error.message === "User not Found"){
      return res.status(404).send({status: false, message: error.message});
    }else if(error.message === "User is not verified"){
      return res.status(409).send({status: false, message: error.message});
    }
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
}

export const otpCheckChangePassword = async (req, res) => {
  try {
    const {otp} = req.body;
    const user = req.user;
    const token = await otpCheckChangePasswordUser(user, otp);
    res.status(200).send({status: true, message: "User verified successfully", token: token});
  } catch (error) {
    if(error.message === "User is not verified"){
      return res.status(409).send({status: false, message: error.message});
    }else if(error.message === "Invalid or expired OTP"){
      return res.status(401).send({status: false, message: error.message});
    }
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
}

export const otpResendChangePassword = async (req, res) => {
  try {
    const user = req.user;
    const token = await otpResendChangePasswordUser(user);
    res.status(200).send({status: true, message: "OTP Resend Successfully", token: token})
  } catch (error) {
    if(error.message === "User is not verified"){
      return res.status(409).send({status: false, message: error.message});
    }
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
}

export const changePassword = async (req, res) => {
  try {
    const {password} = req.body;
    const user = req.user;
    const token = await changePasswordUser(user, password);
    res.status(200).json({ status: true, message: "Password changed successfully", token: token});
  } catch (error) {
    if(error.message === "Password change not authorized"){
      return res.status(403).send({status: false, message: error.message});
    }
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
}

export const tokenVerify = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ status: true, message: "Token Verified successfully", UserDetails: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
  }
}