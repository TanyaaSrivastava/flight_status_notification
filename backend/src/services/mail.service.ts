import nodemailer from "nodemailer";
import { Config } from "../config/Config";
import PDFDocument from 'pdfkit';

const config = new Config();
const doc = new PDFDocument();

const mailOptions = {
  from: 'your-email@gmail.com',
  subject: 'Booking Confirmation',
  text: `Your booking has been confirmed!`,
  attachments: [
      {
          filename: 'booking.pdf',
          content: PDFKit,
          encoding: 'base64',
      },
  ],
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "eternal880047@gmail.com",
    pass: "dhftwpzubkizheku",
  },
});

interface TSendMail {
  to: string;
  subject: string;
  html: string;
}
export const SendMail = async (data: TSendMail) => {
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  } 
  );
  
};