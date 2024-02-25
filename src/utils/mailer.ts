import * as nodemailer from 'nodemailer';
import { MAIL_PASS, MAIL_USER } from './variables';

function generateEmailTransporter() {
  return nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });
}

export function sendActivationTokenEmail(email: string, url: string) {
  const transporter = generateEmailTransporter();

  transporter.sendMail({
    from: 'test@mail.com',
    to: email,
    subject: 'Activate account',
    html: `
    <a href='${url}'>Activate</a>
    `,
  });
}

export function sendForgotPasswordRequestEmail(email: string, url: string) {
  const transporter = generateEmailTransporter();

  transporter.sendMail({
    from: 'test@mail.com',
    to: email,
    subject: 'Reset Password',
    html: `
    <a href='${url}'>Reset Password</a>
    `,
  });
}
