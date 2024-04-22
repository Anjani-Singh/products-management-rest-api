const nodemailer = require('nodemailer');

async function sendInvitationEmail(user, subject, content) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: process.env.EMAIL_PORT, 
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_USER_PASSWORD 
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: user.email,
      subject: subject,
      html: content
    };

    await transporter.sendMail(mailOptions);

    console.log('Invitation email sent successfully');
  } catch (error) {
    console.error('Error sending invitation email: ', error);
  }
}

module.exports = {
  sendInvitationEmail
};
