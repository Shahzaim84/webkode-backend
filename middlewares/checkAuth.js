import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const checkTokenVerify = async(req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader){
            return res.status(401).json({ message: 'Token not provided' });
        } 

        const token = authHeader.split(' ')[1]; // 'Bearer <token>'
        if (!token){
            return res.status(401).json({ message: 'Token missing' });
        } 

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY);
        }catch(error){
            return res.status(401).send({status: false, message: "Invalid or Expired Token"});
        }

        const user = await userModel.findOne({_id: decoded.id, role: decoded.role}).select("-password -changePassword -verifiedToken -verifiedTokenExpiresAt -verifiedPasswordToken -verifiedPasswordTokenExpiresAt");

        if(!user){
            return res.status(404).send({status: false, message: "User not Found"});
        }

        if(user.role !== "Developer"){
            return res.status(409).send({status: false, message: "UnAuthorized Access"});
        }

        if(!user.verified){
            return res.status(409).send({status: false, message: "User is not verified", problem_status: "verified"});
        }

        if(!user.isSubscribed){
            return res.status(403).send({status: false, message: "User is not Subscribed", problem_status: "subscribed"});
        }
        const subsTime = new Date(user.subscribeExpirationTime); // Convert to Date object

        const isRecent = (subsTime) => {
        const currentDate = new Date();
        // Check if the subscription expired more than a month ago
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return subsTime >= oneMonthAgo;
        };

        if (!isRecent(subsTime)) {
        user.isSubscribed = false;
        await user.save();
        return res.status(403).send({ status: false, message: "Subscription Expired", problem_status: "subscribed" });
        }

        req.user = user;
        next();
    }catch(error){
        res.status(500).send({status: false, message: "Internal Server Error"});
        console.log("Error While checking user given token", error);
    }
}

export const checkTokenVerifySubscription = async(req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader){
            return res.status(401).json({ message: 'Token not provided' });
        } 

        const token = authHeader.split(' ')[1]; // 'Bearer <token>'
        if (!token){
            return res.status(401).json({ message: 'Token missing' });
        } 

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY);
        }catch(error){
            return res.status(401).send({status: false, message: "Invalid or Expired Token"});
        }

        const user = await userModel.findOne({_id: decoded.id, role: decoded.role}).select("-password -changePassword -verifiedToken -verifiedTokenExpiresAt -verifiedPasswordToken -verifiedPasswordTokenExpiresAt");

        if(!user){
            return res.status(404).send({status: false, message: "User not Found"});
        }

        if(user.role !== "Developer"){
            return res.status(409).send({status: false, message: "UnAuthorized Access"});
        }

        if(!user.verified){
            return res.status(409).send({status: false, message: "User is not verified", problem_status: "verified"});
        }

        req.user = user;
        next();
    }catch(error){
        res.status(500).send({status: false, message: "Internal Server Error"});
        console.log("Error While checking user given token", error);
    }
}

export const checkTokenVerifyChangePassword = async(req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader){
            return res.status(401).json({ message: 'Token not provided' });
        } 

        const token = authHeader.split(' ')[1]; // 'Bearer <token>'
        if (!token){
            return res.status(401).json({ message: 'Token missing' });
        } 

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY);
        }catch(error){
            return res.status(401).send({status: false, message: "Invalid or Expired Token"});
        }

        const user = await userModel.findOne({_id: decoded.id, role: decoded.role}).select("-password -verifiedToken -verifiedTokenExpiresAt -verifiedPasswordToken -verifiedPasswordTokenExpiresAt");

        if(user.role !== "Developer"){
            return res.status(409).send({status: false, message: "UnAuthorized Access"});
        }

        if(!user){
            return res.status(404).send({status: false, message: "User not Found"});
        }

        if(!user.verified){
            return res.status(409).send({status: false, message: "User is not verified", problem_status: "verified"});
        }

        req.user = user;
        next();
    }catch(error){
        res.status(500).send({status: false, message: "Internal Server Error"});
        console.log("Error While checking user given token", error);
    }
}

export const checkTokenAuth = async(req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader){
            return res.status(401).json({ message: 'Token not provided' });
        } 

        const token = authHeader.split(' ')[1]; // 'Bearer <token>'
        if (!token){
            return res.status(401).json({ message: 'Token missing' });
        } 

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY);
        }catch(error){
            return res.status(401).send({status: false, message: "Invalid or Expired Token"});
        }

        const user = await userModel.findOne({_id: decoded.id, role: decoded.role}).select("-password");
        
        if(user.role !== "Developer"){
            return res.status(409).send({status: false, message: "UnAuthorized Access"});
        }

        if(!user){
            return res.status(404).send({status: false, message: "User not Found"});
        }

        req.user = user;
        next();
    }catch(error){
        res.status(500).send({status: false, message: "Internal Server Error"});
        console.log("Error While checking user given token", error);
    }
}

export const checkAdminTokenVerify = async(req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader){
            return res.status(401).json({ message: 'Token not provided' });
        } 

        const token = authHeader.split(' ')[1]; // 'Bearer <token>'
        if (!token){
            return res.status(401).json({ message: 'Token missing' });
        } 

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY);
        }catch(error){
            return res.status(401).send({status: false, message: "Invalid or Expired Token"});
        }

        const user = await userModel.findOne({_id: decoded.id, role: decoded.role}).select("-password -changePassword -verifiedToken -verifiedTokenExpiresAt -verifiedPasswordToken -verifiedPasswordTokenExpiresAt");

        if(decoded.role !== "Admin"){
            return res.status(409).send({status: false, message: "UnAuthorized Access"});
        }

        if(!user){
            return res.status(404).send({status: false, message: "User not Found"});
        }

        if(!user.verified){
            return res.status(409).send({status: false, message: "User is not verified", problem_status: "verified"});
        }

        req.user = user;
        next();
    }catch(error){
        res.status(500).send({status: false, message: "Internal Server Error"});
        console.log("Error While checking user given token", error);
    }
}