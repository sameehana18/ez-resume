import nodemailer from "nodemailer";
import {User} from "../models/user.models.js";
import { asyncHandler } from "./asyncHandler.js";
import bcrypt from "bcrypt";

const sendEmail = async (email, emailType, userId) => {
    try {
        //create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verificationToken: hashedToken,
                verificationTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                resetToken: hashedToken,
                resetTokenExpiry: Date.now() + 3600000,
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        // copy pasted from mailtrap
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: `${process.env.MAILTRAP_USER}`,
                pass: `${process.env.MAILTRAP_PASSWORD}`,
            },
        });

        const mailOptions = {
            from: 'cvsameehana@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while sending email");
    }
};

export { sendEmail };
