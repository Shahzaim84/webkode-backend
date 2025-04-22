import { body, validationResult } from "express-validator";

export const validateTransfer = [
  body("destinationId").notEmpty().withMessage("Destination Id is required"),
  body("amount").notEmpty().withMessage("Amount is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];

