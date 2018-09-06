const nodemailer = require('nodemailer');

function sendMail(recipientAddress, mailContent) {
  nodemailer.createTestAccount(() => {
    let transporter = nodemailer.createTransport({
      host: 'miriloth.nazwa.pl',
      port: 587,
      secure: false,
      auth: {
        user: 'time-organizer@miriloth.nazwa.pl',
        pass: 'Abcdabcd123',
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
