const nodemailer = require('nodemailer');

function sendMail(recipientAddress, mailContent) {
  nodemailer.createTestAccount((err, account) => {
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
      from: '"Time organizer" <time-organizer@michal-g.pl>', // sender address
      to: recipientAddress,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: mailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

module.exports = {
  sendMail,
};
