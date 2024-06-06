import nodemailer from "nodemailer";

export async function handler(event, context) {
  const { MY_GMAIL_ADDRESS, MY_GMAIL_PASSWORD } = process.env;
  const { postTitle, comment } = JSON.parse(event.body);
  // Create a transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MY_GMAIL_ADDRESS,
      pass: MY_GMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: MY_GMAIL_ADDRESS,
    to: MY_GMAIL_ADDRESS,
    subject: `New Comment in ${postTitle}`,
    text: JSON.stringify(comment),
  };

  try {
    // Send email
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
}
