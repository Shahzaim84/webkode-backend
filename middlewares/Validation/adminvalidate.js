import { body, validationResult } from "express-validator";

export const validateRegitser = [
  body("fullname").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array() });
    }
    next();
  },
];
export const validateCreateUser = [
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

export const validateSubscriptionCancel = [
    body("userId").notEmpty().withMessage("userId is required"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ status: false, message: errors.array() });
      }
      next();
    },
  ];
