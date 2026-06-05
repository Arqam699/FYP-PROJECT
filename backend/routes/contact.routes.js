import express from "express";
import nodemailer from "nodemailer";
import isAuth from "../middlewares/isAuth.js";

const contactRouter = express.Router();

contactRouter.post("/send-contact", isAuth, async (req, res) => {
    try {
        const { name, email, type, message } = req.body;

        if (!name || !email || !type || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all contact fields"
            });
        }

        if (!process.env.Email || !process.env.EmailPassword) {
            return res.status(500).json({
                success: false,
                message: "Contact email credentials are not configured"
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Email,
                pass: process.env.EmailPassword
            }
        });

        await transporter.sendMail({
            from: process.env.Email,
            replyTo: email,
            to: process.env.Email,
            subject: `New Contact Form Message (${type})`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        return res.json({ success: true });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to send contact message"
        });
    }
});

export default contactRouter;
