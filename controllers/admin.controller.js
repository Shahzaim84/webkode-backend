import {createAdmin, createUser, getAllUser, subscriptionCancel} from "../services/admin.service.js";

export const createAdminCont = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const userToken = await createAdmin(fullname, email, password);
    res.status(200).send({status: true, message: "Registered Successfully", token: userToken});
  } catch (error) {
    if(error.message === "User already exists"){
      return res.status(409).send({status: false, message: error.message});
    }
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const createUserCont = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    await createUser(fullname, email, password, role);
    res.status(200).send({status: true, message: "Registered Successfully"});
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

export const subscriptionCancelCont = async (req, res) => {
    try {
      const { userId } = req.body;
      await subscriptionCancel(userId);
      res.status(200).send({status: true, message: "Subscription Cancelled Successfully"});
    } catch (error) {
      if(error.message === "User not Found"){
        return res.status(404).send({status: false, message: error.message});
      }
      console.log(error);
      res.status(500).send({status: false, message: "Internal Server Error"});
    }
  };

export const getAllUserCont = async (req, res) => {
    try {
      const allUsers = await getAllUser();
      res.status(200).send({status: true, message: "All User Data", allUsers});
    } catch (error) {
      console.log(error);
      res.status(500).send({status: false, message: "Internal Server Error"});
    }
};

export const tokenVerify = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ status: true, message: "Token Verified successfully", UserDetails: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
  }
}