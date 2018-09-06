const nodemailer = require('nodemailer');

function sendMail(recipientAddress, mailContent) {
  nodemailer.createTestAccount(() => {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: '"Time organizer" <time-organizer@michal-g.pl>',
      to: recipientAddress,
      subject: 'Time organizer - confirmation',
      html: mailContent,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent');
    });
  });
}

module.exports = {
  sendMail,
};
