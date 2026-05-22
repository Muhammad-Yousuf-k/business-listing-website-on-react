import { sendEmail } from "../utils/sendEmail.js";


/* CONTACT FORM */
export const contactForm = async (req, res, next) => {
    try {
        const { name, email, subject, phone, message } = req.body;

        console.log(req.body);

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        await sendEmail({
            to: email,
            subject: subject,
            html: `
                <p><strong>Name:</strong> ${name || "Not provided"}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Message:</strong></p>
                <p>${message || "Not provided"}</p>
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
