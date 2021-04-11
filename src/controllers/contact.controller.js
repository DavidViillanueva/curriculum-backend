const { response } = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const sendEmail = (req,res = response) => {

        const { name , email , body } = req.body;
   



    const OAauth2 = google.auth.OAuth2;

    const myOAuth2Client = new OAauth2(
        process.env.SMTP_CLIENT_ID,
        process.env.SMTP_CLIENT_SECRET
    )

    myOAuth2Client.setCredentials({
        refresh_token: process.env.SMTP_REFRESH_TOKEN
    })

    const myAccessToken = myOAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.SMTP_USER,
            clientId: process.env.SMTP_CLIENT_ID,
            clientSecret: process.env.SMTP_CLIENT_SECRET,
            refreshToken: process.env.SMTP_REFRESH_TOKEN,
            accessToken: myAccessToken
        }
    })

    const mailOptions = {
        from: "David",
        to: "david1997@live.com.ar",
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