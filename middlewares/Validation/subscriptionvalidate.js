import { body, validationResult } from "express-validator";

export const validatePayment = [
  body("susbscriptionType").notEmpty().withMessage("Susbscription Type is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];

export const validateSubscribe = [
  body("sessionId").notEmpty().withMessage("Session Id is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];

