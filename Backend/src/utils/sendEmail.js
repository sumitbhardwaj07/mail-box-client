import nodemailer from 'nodemailer';

/**
 * Utility function to send an email using Nodemailer.
 * 
 * @param {Object} options - Contains the email data.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.subject - The email subject.
 * @param {string} options.message - The email body content.
 */
export const sendEmail = async (options) => {
  // Create a transporter object using SMTP for testing or real service
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',  // Default to Mailtrap for testing
    port: process.env.EMAIL_PORT || 587,  // Default to Mailtrap TLS port
    auth: {
      user: process.env.EMAIL_USER || 'sb732000@gmail.com',  // Dummy data for Mailtrap
      pass: process.env.EMAIL_PASS  // Dummy password for Mailtrap
    },
    secure: false, // Use true for 465, false for 587
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender's email
    to: options.email ,                        // Recipient's email
    subject: options.subject || 'Test Email',                              // Email subject
    text: options.message || 'This is a test email from Nodemailer',       // Email content
  };

  // Send email and log the result
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};