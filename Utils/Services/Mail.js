const nodemailer = require('nodemailer');
const {EMAIL,PASS} = require('../../config')
const MAIL_SETTINGS= {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASS,
    },
  }


const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: 'Reset Pass OTP ✔', // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome.</h2>
        <p style="margin-bottom: 30px;">Please Use following OTP to reset Pass</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};