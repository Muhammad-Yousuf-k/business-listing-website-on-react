import { sendEmail } from "../utils/sendEmail.js";


/* CONTACT FORM */
export const contactForm = async (req, res, next) => {
    try {
        const { name, email, Subject, Phone, message } = req.body;

        if (!name || !email || !Subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        await sendEmail({
            to: email,
            subject: Subject,
            message: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${Phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Form submitted successfully",
        });
    } catch (error) {
        next(error);
    }
};
