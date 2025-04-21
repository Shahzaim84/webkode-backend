import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("fullname").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("role").notEmpty().withMessage("Role is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];

export const validateOTPCheck = [
  body("otp").isLength({min: 6}).withMessage("OTP must be at least 6 characters"),
  (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  }
]

export const validateforgotPassword = [
  body("email").isEmail().withMessage("Invalid email"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
]

export const validatechangePassword = [
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];