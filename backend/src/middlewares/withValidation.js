import { validateRequest } from "./validate.js";

export const withValidation = (validator) => [validator, validateRequest];
