const { response } = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const sendEmail = (req,res = response) => {

    const { name , email , body } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'SendGrid', // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
    })

    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    const mailOptions = {
        from: "david1997@live.com.ar",
        to: "gdavidv1997@gmail.com",
        subject: "Curriculum contact",
        text: `${name} \n\n ${ body } \n\n ${ email }`,
        html: `<h2>${name}</h2> <p>${body}</p> <a>${email}</a>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.status(500).json({
                error
            })
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({
                msg: `Email sent: ${info.response}.`
            })
        }
    });

}

module.exports = {
    sendEmail
}