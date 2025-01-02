import { Request, Response } from "express";

const path = require("path")
const fs = require("fs");
const nodemailer = require("nodemailer");

nodemailer.createTestAccount((err:any, account:any) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        // host: account.smtp.host,
        // port: account.smtp.port,
        // secure: account.smtp.secure,
        // auth: {
        //     user: account.user,
        //     pass: account.pass
        // }
        host: "smtp.gmail.com",
        port: 465, // 25 or 2525 or 465 or 587
        secure: true,
        auth: {
            user: "sridharan.r@mitrahsoft.com",
            pass: process.env.Mail_Passkey,
        },
    });

    // Message object
    let message = {
        from: 'sridharan@mitrahsoft.com',
        to: 'aswinsuriya.s@mitrahsoft.com',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err:any, info:any) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // 25 or 2525 or 465 or 587
    secure: true,
    auth: {
        user: "sridharan.r@mitrahsoft.com",
        pass: process.env.Mail_Passkey,
    },
});



export const SendingTheMail = (req:Request, res:Response) => {

    const { email } = req.body;

    const otp = Math.floor(Math.random() * 1000000)

    const mailOptions = {
        from: "sridharan.r@mitrahsoft.com",
        to: email,
        subject: "Otp verification for E-commerce website",
        text: `Otp: ${otp} has been recieved`
    };


    transporter.sendMail(mailOptions, (error:any, info:any) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email");
        }
        console.log("Email sent:", info.response);
        res.status(200).json({ msg: "Email sent successfully", otp });
    });
}

module.exports = { SendingTheMail }