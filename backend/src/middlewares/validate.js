import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  let err = errors.array()
  console.log("validateRequest", err);


  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: `something went wrong`,
      errors: errors.array(),
    });
  }

  next();
};
