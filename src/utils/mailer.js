import nodemailer from "nodemailer";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

const createTransporter = () => {
    return nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: `${process.env.MAILTRAP_USER}`,
            pass: `${process.env.MAILTRAP_PASSWORD}`,
        },
    });
};

const sendEmail = async (email, emailType, userId) => {
    try {
        // Create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        const encodedToken = encodeURIComponent(hashedToken);

        let subject, htmlContent;

        if (emailType === "VERIFY") {
            // Update user with verification token and expiry
            await User.findByIdAndUpdate(userId, {
                verificationToken: hashedToken,
                verificationTokenExpiry: Date.now() + 3600000,
            });

            subject = "Verify your email";
            htmlContent = `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${encodedToken}">here</a> to verify your email
                           or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${encodedToken}
                           </p>`;
        } else if (emailType === "RESET") {
            // Update user with reset token and expiry
            await User.findByIdAndUpdate(userId, {
                resetToken: hashedToken,
                resetTokenExpiry: Date.now() + 3600000,
            });

            subject = "Reset your password";
            htmlContent = `<p>Click <a href="${process.env.DOMAIN}/reset-password?token=${encodedToken}">here</a> to reset your password
                           or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${encodedToken}
                           </p>`;
        } else {
            throw new Error("Invalid email type");
        }

        const transporter = createTransporter();
        const mailOptions = {
            from: 'cvsameehana@gmail.com',
            to: email,
            subject: subject,
            html: htmlContent
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while sending email");
    }
};

export { sendEmail };
