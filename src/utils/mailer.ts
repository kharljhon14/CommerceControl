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

interface Profile {
  email: string;
  url: string;
}

export function sendVerificationEmail({ email, url }: Profile) {
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
