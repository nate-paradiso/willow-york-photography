const nodemailer = require("nodemailer");
const querystring = require("querystring");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Parse URL-encoded body
  const { name, email, message } = JSON.parse(event.body);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_GMAIL_ADDRESS,
      pass: process.env.MY_GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MY_GMAIL_ADDRESS,
    to: process.env.MY_GMAIL_ADDRESS,
    subject: "New Contact Form Submission Willow York",
    text: `A message on Willow York Photography has been sent by:\n\nName: ${name}\nEmail: ${email}\n\nMessage: ${message}\n\n**Reply by clicking the submitted email address.**`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email" }),
    };
  }
};
