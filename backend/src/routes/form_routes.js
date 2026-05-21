import express from "express";
import {
    contactForm,
} from "../controllers/forms.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { formValidator } from "../validator/form_verify.js";

const router = express.Router();

router.post(
    "/contact-form",
    csrfProtection,
    withValidation(formValidator.contactForm),
    contactForm
);


export default router;