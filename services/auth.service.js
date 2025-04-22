import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import AccountModel from "../models/account.model.js";
import sendOTP from "../utils/sendOTP.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (fullname, email, password, role) => {
  const user = await userModel.findOne({
    email
  });

  if(user){
    throw new Error("User already exists");
  }

  const userrole = ["Developer", "Admin"];
  if(!userrole.includes(role)){
    throw new Error("Please Select Correct User Role")
  }

  const otp = await sendOTP(email);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    fullname,
    email, 
    password: hashedPassword,
    role,
    verifiedToken: otp.otpCode,
    verifiedTokenExpiresAt: otp.otpExpirationTime,
    createdAt: new Date()
  })

  await AccountModel.create({
    userId: newUser._id
  })

  const usercreate = {_id: newUser._id, role};
  const token = generateToken(usercreate);

  return token;
};

export const loginUser = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  if(!user.verified){
    throw new Error("User is not verified");
  }

  user.lastlogin = new Date();
  await user.save();

  const token = generateToken(user);

  return { token, user };
};

export const otpCheckAccountVerifiedUser = async (user, otp) => {
  if(user.verified){
    throw new Error("User is already verified");
  }

  // Check if OTP is correct and verify its expiration time
  if (otp !== user.verifiedToken || Date.now() > user.verifiedTokenExpiresAt) {
    throw new Error("Invalid or expired OTP");
  }

  user.verified = true;
  await user.save();

  const token = generateToken(user);
  return token;
}

export const otpResendAccountVerifiedUser = async (user) => {
  if(user.verified){
    throw new Error("User is already verified");
  }

  const otp = await sendOTP(user.email);

  user.verifiedToken = otp.otpCode;
  user.verifiedTokenExpiresAt = otp.otpExpirationTime;
  await user.save();

  const token = generateToken(user);

  return token;
}

export const forgotPasswordUser = async (email) => {
  const user = await userModel.findOne({email});
  if(!user){
    throw new Error("User not Found");
  }
  if(!user.verified){
    throw new Error("User is not verified");
  }

  const otp = await sendOTP(user.email);
  user.verifiedPasswordToken = otp.otpCode;
  user.verifiedPasswordTokenExpiresAt = otp.otpExpirationTime;
  await user.save();
  const token = generateToken(user);
  return token;
}

export const otpCheckChangePasswordUser = async (user, otp) => {

  if(!user.verified){
    throw new Error("User is not verified");
  }

  // Check if OTP is correct and verify its expiration time
  if (otp !== user.verifiedPasswordToken || Date.now() > user.verifiedPasswordTokenExpiresAt) {
    return res.status(401).json({ status: false, message: "Invalid or expired OTP" });
  }

  user.changePassword = true;
  await user.save();

  const token = generateToken(user);
  return token;
}

export const otpResendChangePasswordUser = async (user) => {

  if(!user.verified){
    throw new Error("User is not verified");
  }

  const otp = await sendOTP(user.email);

  user.verifiedPasswordToken = otp.otpCode;
  user.verifiedPasswordTokenExpiresAt = otp.otpExpirationTime;
  await user.save();

  const token = generateToken(user);

  return token;
}

export const changePasswordUser = async (user, password) => {
  // Ensure the user is authorized to change their password
  if (!user.changePassword) {
    throw new Error("Password change not authorized");
  }
  
  // Hash the new password and update it in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  user.changePassword = false; 
  await user.save();

  const token = generateToken(user);

  return token;
}
