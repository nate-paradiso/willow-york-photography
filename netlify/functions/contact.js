// netlify/functions/contact.js

const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Replace with your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your-email@example.com", // Your SMTP username
      pass: "your-email-password", // Your SMTP password
    },
  });

  // Setup email data
  let mailOptions = {
    from: '"Contact Form" <your-email@example.com>',
    to: "your-receiving-email@example.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: "Message sent successfully!",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
