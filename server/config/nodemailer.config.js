require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../config/auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirmations/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.forgotPassword = (name, email, resetLink) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Forgot password",
    html: `<h1>Forgot Password</h1>
        <h2>Hello ${name}</h2>
        <p>Clicker here to reset your password</p>
        <a href=${resetLink}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.passwordResetSuccessFully = (name, email) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Password changed successfully",
    html: `<h1>Password Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Password reset successfully</p>
        </div>`,
  }).catch(err => console.log(err));
};
