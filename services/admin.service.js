import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const createAdmin = async (fullname, email, password) => {
  const user = await userModel.findOne({
    email
  });

  if(user){
    throw new Error("User already exists");
  }

   const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(fullname, email, hashedPassword)
  const newUser = await userModel.create({
    fullname,
    email, 
    password: hashedPassword,
    role: "Admin",
    verified: true,
    createdAt: new Date()
  })

  const usercreate = {_id: newUser._id, role: "Admin"};
const token = generateToken(usercreate);
  
    return token;
};

export const createUser = async (fullname, email, password, role) => {
  const user = await userModel.findOne({
    email
  });

  if(user){
    throw new Error("User already exists");
  }

  const userrole = ["Developer"];
  if(!userrole.includes(role)){
    throw new Error("Please Select Correct User Role")
  }

   const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    fullname,
    email, 
    password: hashedPassword,
    role,
    verified: true,
    createdAt: new Date()
  })
};

export const subscriptionCancel = async (userId, email) => {
    const user = await userModel.findOne({
      _id: userId, email
    });
  
    if(!user){
      throw new Error("User not Found");
    }
  
    user.isSubscribed = false;
    await user.save();
  };


export const getAllUser = async () => {
    const user = await userModel.find({
      role: "Developer"
    }).select("-password -verifiedToken -verifiedTokenExpiresAt -verifiedPasswordToken -verifiedPasswordTokenExpiresAt");
    return user;
  };
